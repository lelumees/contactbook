import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config';
import logo from '../../assets/logo.svg';
import './styles.css';

let searchTimeout;

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            searchQuery: '',
            contacts: [],
            fetching: false,
            error: false
        }

        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.searchContacts = this.searchContacts.bind(this);
        this.handleSearchSuccess = this.handleSearchSuccess.bind(this);
        this.handleSearchError = this.handleSearchError.bind(this);
        this.renderHelpText = this.renderHelpText.bind(this);
    }

    handleSearchSuccess(response) {
        this.setState({ contacts: response.data, fetching: false });
    }

    handleSearchError(error) {
        console.error(error);
        this.setState({ error: true, fetching: false });
    }

    searchContacts() {
        const { searchQuery } = this.state;

        axios.get(config.contactsUrl, { params: { q: searchQuery } })
            .then(this.handleSearchSuccess)
            .catch(this.handleSearchError);
    }

    handleSearchInputChange(e) {
        clearTimeout(searchTimeout);

        const searchQuery = e.target.value;

        if (searchQuery.length < 2) {
            this.setState({ searchQuery, contacts: [], error: false, fetching: false });
            return;
        }

        this.setState({ searchQuery, fetching: true, error: false });
        searchTimeout = setTimeout(this.searchContacts, 300);
    }

    renderHelpText() {
        const { searchQuery, contacts, fetching, error } = this.state;
        if (error) return 'Oops, something went wrong with the request';
        if (fetching) return 'Searching...';
        if (searchQuery.length < 2) return 'Type at least 2 characters/numbers to start searching';
        return contacts.length ? `Found ${contacts.length} contacts` : 'Sorry, I could not find anyone';
    }

    render() {
        const { searchQuery, contacts } = this.state;

        return (
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                </header>
                <div className='App-searchbar'>
                    <input
                        type='text'
                        className='App-searchbar-input'
                        value={searchQuery}
                        onChange={this.handleSearchInputChange}
                    />
                </div>
                <p className='App-helptext'>{this.renderHelpText()}</p>
                <div className='App-contacts'>
                    {
                        contacts.map((contact, index) => {
                            return <p key={index}>{contact.name} | {contact.mobile}</p>;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default App;
