import React, { Component } from 'react';
import './App.css';
import List from './List.js';
import STORE from './STORE.js'

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}

function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
        key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}

class App extends React.Component {
  state = {
    store: STORE
  };

  //static defaultProps = {
  //  store: {
  //    lists: [],
  //    allCards: {},
  //  }
  //};
  
  handleDeleteCard = (cardId) => {
    console.log('clicked delete card')
    // when the delete card button is clicked on any card,
    // remove all instances of that card from state
    //this.setState({  }
    const { lists, allCards } = this.state.store;
    const newLists = lists.map(list => ({
      ...list,
      cardIds: list.cardIds.filter(id => id !== cardId)
    }));

    const newCards = omit(allCards, cardId)

    this.setState({
      store: {
        lists: newLists,
        allCards: newCards
      }
    })
  };

  // data being pushed to List.js
  // when delete is clicked
  // information is passed back into App.js

  handleAddCard = (listId) => {
    console.log('clicked add card')
    // when the add random card button is clicked, generate a random card
    // and add it to the state and the appropriate list
    //this.setState({ allCards: newRandomCard })
    const newCard = newRandomCard()
    const newLists = this.state.store.lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cardIds: [...list.cardIds, newCard.id]
        }
      }
      return list;
    })

    this.setState({
        store: {
          lists: newLists,
          allCards: {
            ...this.state.store.allCards,
            [newCard.id]: newCard
          }
        }
    })
  }
  
  render() {
    const {store} = this.state
    return (
      <main clasName="App">
        <header className="App-header">
          <h1>Trelloyes!</h1>
        </header>
        <div className="App-list">
          {store.lists.map(list =>
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id =>
                store.allCards[id])}
              onClickDelete={this.handleDeleteCard}
              onClickAdd={this.handleAddCard}
            />
          )}
        </div>
      </main>
    );
  }
}

export default App;
