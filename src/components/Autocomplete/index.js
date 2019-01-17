import React, { Component } from "react";
import PropTypes from "prop-types";

import './styles.css';

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ''
    };
    
  }

  _input: ?HTMLInputElement;

  componentDidMount() {
    this._input.focus();
  }

  // Event fired when the input value is changed
  onChange = async e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    await this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  // Event fired when the user clicks on a suggestion
  onClick = async e => {
    // Update the user input and reset the rest of the state
    await this.setState({
      //activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  // Event fired when the user mouse over a suggestion item
  onMouseOver = async e => {
    // Update the user input and reset the rest of the state
    await this.setState({
      //activeSuggestion: 0,
      userInput: e.currentTarget.innerText
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = async e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      if(e.currentTarget.value){
        await this.setState({
          //activeSuggestion: 0,
          showSuggestions: false,
          userInput: filteredSuggestions[activeSuggestion]
        });
      }
      this.props.callbackParent(this.state.userInput);
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  // Event fired when the user clicks in the input field
  onFocus = async e => {
    // Update the user input and reset the rest of the state
    await this.setState({
      //activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ''
    });
  };
  
  // Event fired when the user get out from input field
  onBlur = async e => {
    // Update the user input and reset the rest of the state
    await this.setState({
      showSuggestions: false,
    });
  };


  render() {
    const {
      onChange,
      onClick,
      onMouseOver,
      onFocus, 
      onBlur,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={`suggestions__item ${className} `}
                  key={suggestion}
                  onClick={onClick}
                  onMouseOver={onMouseOver}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>Ítem não encontrado em nossa lista!</em>
          </div>
        );
      }
    }

    return (
      <div className={`autocomplete-block ${this.state.focused ? "focused": ""}`}>
        <input className="input-autocomplete form-control"
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          onFocus={onFocus}
          value={userInput}
          placeholder={this.props.texto?this.props.texto : ''}
          autoFocus
          ref={c => (this._input = c)}
        />
        {suggestionsListComponent}
      </div>
    );
  }
}

export default Autocomplete;
