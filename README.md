
<center>
<img src="https://www.filepicker.io/api/file/57XgNv1URwmpHlaM1HqR" width="300">
</center>

## Intro
Teste técnico para LinkAPI - integração entre as plataformas Pipedrive e Bling.

## Ferramentas
- **NodeJs** 
- **Typescript** 
- **NestJS** 
- **MongoDB**
- **Redis**
- **Swagger UI**

## Requirements

- Criar contas testes nas plataformas Pipedrive e Bling;

- Criar uma integração entre as plataformas Pipedrive e Bling. (A integração deve buscar as oportunidades com status igual a ganho no Pipedrive, depois inseri-las como pedido no Bling);

- Criar banco de dados mongo;

- Criar uma collection no banco de dados MongoDB agregando as oportunidades inseridas no Bling por dia e valor total;

- Criar endpoint para trazer os dados consolidados da collection do MongoDB;

## Funcionalidades
- Integração entre as plataformas;
- Inserção no banco;
- Retorno de pedidos por dia, com valor total;
- Cache no Redis para evitar consumir API com dado que já existe;
- Scheduler para sincronizar as bases a cada minuto;

## Configuração
```bash
To run the project, you need Yarn and Node installed.
1.  Clone o repo usando `https://github.com/filipenabrantes/linkapi-integration.git`
2.  Acesse a o diretório: `cd linkapi-integration`.  
3.  Rode `yarn install` para instalar as dependências
4.  Rode `yarn start:dev`
5. Acesse [http://localhost:3000](http://localhost:3000)

```
## Rotas
- Interface de teste da API para teste - http://localhost:3000/api
- Força uma sincronização entre as bases - http://localhost:3000/manager/sync
- Listar os pedidos, agregando por dia e valor http://localhost:3000/manager/orders
