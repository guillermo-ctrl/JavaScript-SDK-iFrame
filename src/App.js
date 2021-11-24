import './App.css';
import Button from './components/Button';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="https://www.programmableweb.com/sites/default/files/styles/article_profile_150x150/public/CleverPush.png?itok=3gWwEYI2" alt="logo" />
        <p>
          Toggle push notifications.
        </p>
        <Button></Button>
      </header>
    </div>
  );
}
