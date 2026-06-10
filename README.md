### Bem vindo !

## Como rodar o projeto:
  Bom este projeto é o front-end de cotações da root code, para rodar ele é necessário seguir alguns passos:
  - Clonar o repositório
  - Instalar as dependencias
  - Criar o arquivo .env na raiz do seu projeto
  - Colocar o host no qual seu back-end esta hospedado na seguinte variavel: "VITE_BACK_API_URL", exemplo:
  ```bash
  VITE_BACK_API_URL=http://localhost:8000/api
  ```
  - Pronto !

## Decisões e premissas
  - Eu decidi usar o react por mais praticidade e como nao irei utilizar rotas, acredito ser um pouco mais simples para um single page
  - Decidi usar o axios por custume e praticidade, eu gosto da facilidade dele de uso no dia a dia.
  - Resolvi utilizar o zustand por ser mais mais simples e sem necessidade de complexidade no uso do estado global, para compartilhar informações entre componentes no projeto todo, utilizei ele para centralizar tambem o estado da cotação, porque envolvia multiplos componentes (formulario e resultado), tanto loading, errors e quote estao em unico lugar no store, mantendo um componente para entradada de dados e outro para visualização.
