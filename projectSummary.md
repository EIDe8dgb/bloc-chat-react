Summary of chat-react project up to this point (notes to self):
1. on command line, navigate to desired directory for new app
2. invoke `create-app-react bloc-chat-react`
3. go to Firebase website, create new project and create new Realtime NoSQL Database
4. within Data section of the database, create a `rooms` key, with nested incremental numbers keys (1-3), and then nested key:value pairs corresopnding to 3 rooms (`room1`, `room2`, and `room3`)
5. within the Rules section of the database, set the rules using a JSON file that contains a single parent key `rules`. Nested within `rules`, place 2 key-value pairs corresponding using `.read` and `.write` as the keys, setting values for both keys to `true`. Each key-value pair is separated by a comma, NOT a semicolon
6. go back to command line and `cd` to to the project directory. Use `npm install -S firebase` to add firebase to the project
7. import firebase to `App.js` file with `import * as firebase from 'firebase'`
8. go back to Firebase website and register the `bloc-chat-react` project with Firebase, and choose option to add Firebase to the web application. Paste the provided boilerplate code to `App.js`. The boilerplate code assigns to a variable `config` an object containing the API key and other identification codes Firebase creates for the application
9. Create a `components` folder within the `src` folder for the project
10. Within `components`, create a new file `RoomList.js` which will contain a new React component called `RoomList`
11. Go back to `App.js`, and within the `App` component's `render()` function add `RoomList` to the return statement and pass firebase to the `RoomList` component as a `prop`: 
```javascript
class App extends Component {
  render() {
    return (
      <RoomList firebase={firebase}/>
    );
  }
}
```
12. import the `RoomList` component to `App.js`:
```javascript
import RoomList from './components/RoomList';
```
13. go to `RoomList.js` and:
    * import React:
    ```javascript
    import React, {Component} from 'react';
    ```
    * create the basic `RoomList` class Component with the `constructor()` and `render()` methods required by React class components:
    ```javascript
    class RoomList extends Component {
        constructor(props){
            super(props);
        }
    }

    render(){
        return();
    }
    ```
    * export the `RoomList` component to `App.js` by adding an `export` statement to the bottom of `RoomList.js`:
    ```javascript
    export default RoomList;
    ```

14. The `RoomList` component will hold state for the list of rooms (currently `rooms1`, `rooms2`, `rooms3` as created on Firebase site), so create empty `rooms` array to define this state within the `constructor()` method of `RoomList` component:
```javascript
this.state={rooms: []};
```

15. Create a firebase reference using the `.firebase.database().ref()` method within `RoomList`'s `constructor()` method in order for the application to be able to access the `rooms` key in the firebase database. `App.js` passes `firebase` to `RoomList` as a prop. Assign the reference to `roomsRef`:
```javascript
this.roomsRef = this.props.firebase.database().ref('rooms');
```

16. While `RoomList` is mounted, we want to access the Firebase database and update its information within the application. Use the `componentDidMount()` method to access the firebase reference `roomsRef`. Apply the `.on()` method and the `child-added` event type to access the returned `snapshot` object's `key` and `val` values and assign them to variables and update the `rooms` state for `RoomList`. When updating state, use the `.concat()` method rather than `.push()` so that we are not mutating the `rooms` array:
```javascript
componentDidMount(){
    this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
        this.setState=({rooms: this.state.rooms.concat(room) });
    });
}
```

17.Add to the `render()` method for `RoomList` the JSX so that the current list of rooms in the database is displayed. Remember with JSX syntax the javascript code must be enclosed by curly braces:
```javascript
render(){
    return(
      <nav className='chatRooms'>
        <ul>
          {
            this.state.rooms.map((room,index) =>
              <li key={index}>{room.name}</li>
            )
          }
        </ul>
      </nav>
    );
  }
```
