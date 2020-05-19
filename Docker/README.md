
## Création du network

```bash
$ docker network create --driver=overlay traefik-public
```

## Lancement

```bash
$ docker stack deploy --compose-file docker-compose.yml STACKNAME
```

## Stop

```bash
$ docker stack rm STACKNAME
```

