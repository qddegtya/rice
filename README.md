<h1 align="center">
  <br>
	<img width="128" src="media/logo.png" alt="Rice">
  <br>
  <br>
  <br>
</h1>

# About

> 📦 out-of-box micro-frontends solution

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

- Full Documentation
  - [Motivation](./docs/motivation.md)
  - [Principle](./docs/principle.md)
  - [Runtime Core](./docs/runtime-core.md)
  - [x-view](./docs/x-view.md)
  - [x-sandbox](./docs/sandbox.md)

# Introduction

> 🍩 🎉 😊 Let's eat some food

### Runtime Core

#### Define App component with "sidecar"

```javascript
// index.js
import { connect } from "@arice/core";
import UserInfo from "./UserInfo";
import effects from "./effects";

function App({ dispatch, provide }) {
  provide('App')({
    openPage: page => {
      openPage(page)
    }
  });

  return <Layout>
    <UserInfo />
    <Footer onClick={() => dispatch('logout')}></Footer>
  </Layout>;
}

export default connect({ effects })(App);

// effects.js
export default ({ $, inject }) => {
  const service = inject({
    'userInfo': '@component/UserInfo'
  });

  $('logout').subscribe(() => {
    service.userInfo.logout();
  });
})
```

#### Define UserInfo component with "sidecar"

```javascript
// index.js
import { useState } from 'react';
import { connect } from "@arice/core";
import effects from "./effects";

function UserInfo({ dispatch, provide }) {
  const [user, setUser] = useState('');

  provide('UserInfo')({
    logout: () => {
      logoutService.call();
    }
  });

  return <div/>
    <span>{user}<span>
    <Link onClick={url => dispatch('openPage', url)} title="open user detail page" />
  </Link>;
}

export default connect({ effects })(UserInfo);

// effects.js
export default ({ $, inject }) => {
  const service = inject({
    'app': '@component/app'
  });

  $('logout').subscribe(() => {
    service.app.openPage();
  });
})
```

#### Start

```javascript
import Rice from "@arice/core";
import App from "./App.jsx";

const app = Rice();

app.load(() => <App />);

app.start("#container");
```
