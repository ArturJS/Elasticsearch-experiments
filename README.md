# Elasticsearch-experiments

## Installation

1. Install *Docker* and *Docker compose* following by one of these guides:
  [https://linuxconfig.org/how-to-install-docker-on-ubuntu-18-04-bionic-beaver](https://linuxconfig.org/how-to-install-docker-on-ubuntu-18-04-bionic-beaver)
  or
  [https://totaku.ru/ustanovka-docker-i-docker-compose-v-ubuntu-18-04/](https://totaku.ru/ustanovka-docker-i-docker-compose-v-ubuntu-18-04/)

2. `npm install`

3. `npm start`

## Gotchas:
1. When you're starting the first time, you may face the following error
  ```vm.max_map_count [65530] is too low```
it can be fixed by the following guide [https://github.com/spujadas/elk-docker/issues/89#issuecomment-261419109](https://github.com/spujadas/elk-docker/issues/89#issuecomment-261419109)
