import { applications } from './mocks/applications';
import config from './mocks/config';

class MockApi {
  login(name: string, pass: string) {
    if (name === 'admin' && pass === 'admin') {
      return Promise.resolve({
        name,
        token: 'testToken',
      });
    }

    return Promise.reject('Invalid user');
  }

  logout() {
    return Promise.resolve();
  }

  getApps() {
    return Promise.resolve(applications.Apps);
  }

  deleteApp(appName: string) {
    return Promise.resolve();
  }

  createApplication(appName: string) {
    return Promise.resolve({
      AppName: appName,
      Versions: [{
        Version: '1',
        ActiveBuild: 1,
        LastBuild: 1,
        Builds: [],
      }],
    });
  }

  loadConfig(appName: string) {
    return Promise.resolve(config.AnagogDefaultConfig);
  }

  updateConfig(config: any) {
    return Promise.resolve(config);
  }

  loadUsers(appName: string) {
    return Promise.resolve([
      {
        name: 'user1',
        id: '123141',
      },
      {
        name: 'user2',
        id: 'asdas',
      },
      {
        name: 'user3',
        id: 'adsad',
      },
    ]);
  }

  addUser(appName, user) {
    return Promise.resolve({
      name: user.name,
      id: String(Math.random()),
    });
  }

  deleteUsers(appName, ids) {
    return Promise.resolve();
  }
}

const API = new MockApi();

export default API;
