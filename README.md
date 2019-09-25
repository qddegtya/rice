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
  - [Runtime Core](./docs/runtime-core.md)
  - [x-view](./docs/x-view.md)
  - [x-sandbox](./docs/sandbox.md)

> 🍩 🎉 😊 Let's eat some food

### Runtime Core

#### Define App component

```javascript
import { connect } from "@arice/core";
import UserInfo from "./UserInfo";
import effects from "./effects";

function App({ dispatch, provide }) {
  provide('App')({
    greet: name => {
      alert(`hello, ${name}`);
    }
  });

  return <UserInfo onLogin={name => dispatch("greet", name)} />;
}

export default connect({ effects })(App);
```

#### Define UserInfo component

```javascript
import { connect } from "@arice/core";
import effects from "./effects";

function UserInfo({ dispatch, provide }) {
  provide('UserInfo')({
    setTitle: title => {
      document.title = title;
    }
  });

  return <UserInfoCom />;
}

export default connect({ effects })(UserInfo);
```

#### Add effects

```javascript
// effects.js
export default ({ $, inject }) => {
  // use component
  const components = inject({
    'app': '@component/App',
    'userInfo': '@component/UserInfo'
  })

  $("greet").subscribe(name => {
    components.app.greet(name);
    components.userInfo.setTitle(name);
  });
};
```

#### Start

```javascript
import Rice from "@arice/core";
import App from "./App.jsx";

const app = Rice();

app.load(() => <App />);

app.start("#container");
```
