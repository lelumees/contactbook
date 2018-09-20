import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config';
import logo from '../../assets/logo.svg';
import './styles.css';

const SEARCH_TIMEOUT_MS = 300;
let searchTimeout;

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            searchQuery: '',
            contacts: [],
            fetching: false,
            error: false,
            selectedContact: null,
            message: ''
        }

        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.searchContacts = this.searchContacts.bind(this);
        this.handleSearchSuccess = this.handleSearchSuccess.bind(this);
        this.handleSearchError = this.handleSearchError.bind(this);
        this.renderHelpText = this.renderHelpText.bind(this);
        this.renderContact = this.renderContact.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleMessageClick = this.handleMessageClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
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
            this.setState({ searchQuery, contacts: [], error: false, fetching: false, selectedContact: null });
            return;
        }

        this.setState({ searchQuery, fetching: true, error: false, selectedContact: null });
        searchTimeout = setTimeout(this.searchContacts, SEARCH_TIMEOUT_MS);
    }

    handleContactClick(contact) {
        this.setState({ selectedContact: contact });
    }

    handleMessageChange(e) {
        this.setState({ message: e.target.value });
    }

    handleMessageClick() {
        const { message, selectedContact } = this.state;

        if (!message || !message.length) return;
        this.setState({ message: '', selectedContact: null });

        axios.post(config.sendSMSUrl, { to: selectedContact.mobile, message })
            .then(result => console.log(result))
            .catch(err => console.error(err));
    }

    handleCancelClick() {
        this.setState({ message: '', selectedContact: null });
    }

    renderHelpText() {
        const { searchQuery, contacts, fetching, error } = this.state;
        if (error) return 'Oops, something went wrong with the request';
        if (fetching) return 'Searching...';
        if (searchQuery.length < 2) return 'Type at least 2 characters/numbers to start searching';
        if (!contacts.length) return 'Sorry, I could not find anyone';

        const countString = contacts.length === 1 ? 'contact' : 'contacts';
        return `Found ${contacts.length} ${countString}`;
    }

    renderContact(contact, index) {
        const { selectedContact, message } = this.state;
        const isSelected = selectedContact && selectedContact.id === contact.id;

        return (
            <div key={index} className='App-contact'>
                <div className='App-contact__content'>
                    <div className='App-contact__data strong'>{contact.name}</div>
                    <div className='App-contact__data'>{contact.mobile}</div>
                    <div className='App-contact__actions'>
                        { contact.mobile && !isSelected &&
                            <div className='App-button' onClick={ () => { this.handleContactClick(contact)} }>
                                Message
                            </div>
                        }
                    </div>
                </div>
                { isSelected &&
                    <div className=''>
                        <textarea className='App-message-area' onChange={this.handleMessageChange}>{message}</textarea>
                        <div className='App-message-actions'>
                            <div className='App-button outlined' onClick={this.handleCancelClick}>Cancel</div>
                            <div className='App-button' onClick={this.handleMessageClick}>Send SMS</div>
                        </div>
                    </div>
                }
            </div>
        );
    }

    render() {
        const { searchQuery, contacts } = this.state;

        return (
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                </header>
                <h2 className='App-title'>Welcome to ContactBook!</h2>
                <p>Search for contacts and send them messages with ease.</p>
                <div className='App-searchbar'>
                    <input
                        type='text'
                        className='App-searchbar-input'
                        value={searchQuery}
                        onChange={this.handleSearchInputChange}
                    />
                </div>
                <p className='App-helptext'>{ this.renderHelpText() }</p>
                <div className='App-contacts'>{ contacts.map(this.renderContact) }</div>
            </div>
        );
    }
}

export default App;
