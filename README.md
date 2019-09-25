<h1 align="center">
  <br>
	<img width="128" src="media/logo.png" alt="Rice">
  <br>
  <br>
  <br>
</h1>

> 📦 out-of-box micro-frontends solution

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

- Full Documentation
  - [Motivation](./docs/motivation.md)
  - [Principle](./docs/principle.md)

# Quick Start

> 🍩 Let's eat some food

### Define App component

```javascript
import { connect } from "@arice/core";
import UserInfo from "./UserInfo";
import effects from "./effects";

function App({ dispatch, provide }) {
  provide({
    greet: name => {
      alert(`hello, ${greet}`);
    }
  });

  return <UserInfo onLogin={name => dispatch("greet", name)} />;
}

export default connect({ effects })(App);
```

### Define UserInfo component

```javascript
import { connect } from "@arice/core";
import effects from "./effects";

function UserInfo({ dispatch, provide }) {
  provide({
    setTitle: title => {
      document.title = title;
    }
  });

  return <UserInfoCom />;
}

export default connect({ effects })(UserInfo);
```

### Add effects

```javascript
// effects.js
export default ({ $, inject }) => {
  const app = inject("@component/App");
  const userInfo = inject("@component/UserInfo");

  $("greet").subscribe(name => {
    app.greet(name);
    userInfo.setTitle(name);
  });
};
```

### start

```javascript
import Rice from "@arice/core";
import App from "./App.jsx";

const app = Rice();

app.load(() => <App />);

app.start("#container");
```
