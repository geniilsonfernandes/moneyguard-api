<img src="ui_01.png">

<h2 align="center">Money Guard api Back end</h1>

  <p align="center" id="menu">
    <a href="#sobre-o-projeto">Sobre o projeto</a>
    <a href="#stacks-utilizadas">Stacks utilizadas</a>
        <a href="#rotas">Rotas</a>
    <a href="#instalação-e-execução-local">Instalação e execução local</a>
  </p>

  <h2 align="center" id="sobre-o-projeto">Sobre o projeto</h2>

  <p align="center">
    Money Guard é um aplicativo de controle financeiro focado na gestão mensal, estabelecendo metas e tendo como ponto central o salário do usuário. Com ele, podemos acompanhar de forma mais eficiente o que recebemos, estabelecer objetivos e economizar nossa graninha.
  <p>
 <p align="center">
  Este aplicativo nasceu da necessidade de substituir o uso do Google Sheets por um sistema mais completo. Eu e minha esposa enfrentamos limitações ao utilizar o Google Sheets para gerenciar nossas finanças, o que nos motivou a criar o Money Guard. 
</p>

  <h2 align="center" id="stacks-utilizadas">Stacks utilizadas</h2>
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=git,docker,ts,netlify,nodejs,postgres,prisma,react,redux,supabase,tailwind,figma" />
  </a>
</p>
 <h2  id="rotas' align="center"> Rotas</h2>
 
  <h3  align="center"> Rotas de Despesas (Expenses)</h2>
    ## Autenticação Necessária: Sim
  <ul>
    <li>POST /expenses: Cria uma nova despesa.</li>
    <li>POST /expenses/:id: Atualiza uma despesa específica.</li>
    <li>DELETE /expenses/:id: Deleta uma despesa específica.</li>
    <li>GET /expenses: Retorna todas as despesas.</li>
    <li>GET /expenses: Retorna todas as despesas.</li>
    <li>GET /expense/:id: Retorna uma despesa específica.</li>
  </ul>

   <h3  align="center">Rotas de Orçamento (Budgets)</h2>
   
    ## Autenticação Necessária: Sim
  
  <ul>
    <li>POST /budgets: Cria um novo orçamento.</li>
    <li>POST /budgets/:id: Atualiza um orçamento específico.</li>
    <li>DELETE /budgets/:id: Deleta um orçamento específico.</li>
    <li>GET /budgets: Retorna todos os orçamentos.</li>
  </ul>
  
  <h3  align="center">Rotas de Usuários (Users)</h2>
  
    ## Autenticação Necessária: Não
  
  <ul>
    <li>POST /users: Cria um novo usuário.</li>
    <li>GET /users/:id: Retorna informações de um usuário específico.</li>
  </ul>

  <h3  align="center">Rotas de Autenticação (Auth)</h2>
  
    ## Autenticação Necessária: Não
  
  <ul>
    <li>POST /login: Autentica um usuário e gera um token JWT.</li>
    <li>POST /refresh: Atualiza o token JWT.</li>
  </ul>



  <h2 id="instalação-e-execução-local" align="center"> Instalação e execução local </h2>
  
  <p>
  Para executar esta aplicação, é necessário ter o Docker. 

<b>Siga as instruções para executar a API.</b>

  </p>

  Configurando o  .env
    
  ```
 #  money-db , é os mesmo que vai estar no docker compose
DATABASE_URL="postgresql://root:root@localhost:5432/money-api_db"
PORT=5000
NODE_ENV="dev"
JWT_SECRET={coloque qulaque coisa}

```

  agora podemos seguir
  
  ```
  npm i
  npm run db:docker
  npm run prisma:generate
  npm run prisma:push
  
  npm run dev

```

<p>
O aplicativo estará disponível em http://localhost:5173/. Siga as instruções na tela de onboard para configurar o aplicativo.
</p>



<h2 align="center">Contato e redes sociais</h2>
<ul>
  <li>
    <a href="https://www.linkedin.com/in/genilson-fernandes">Linkedin</a>
  </li>
  <li>
    Email - geniilsonfernandes@gmail.com
  </li>
</ul>
