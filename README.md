Salve guys beleza ?

Esse é um projeto realizado para um desafio da empresa nave.rs, onde consiste em uma aplicação em nodejs com typescript na construção de navedex's, nele tu poderá se cadastrar utilizando email e senha, e então ao logar terá acesso ao banco de dados dos seus navers, possuindo informações como: nomes, data de nascimento, cargos, tempo de empresa e projetos que participou.

Para rodar o sistema, precisamos de alguns requisitos, para isso preparei um notion contendo nele as informações necessárias.

www.notion.so/Challenge-nave-c24b026f160643fb8222cd7a8d29727a

Dificuldades encontradas no desenvolvimento:

Observei dificuldades na construção de um tipo para a biblioteca express, onde utilizei para poder pegar o id de usário de um forma global, facilitando assim cadastros que utilizam a id do usário logado. Consegui idetificar o erro através do fórum da rockseat, onde obtive o suporte de outros devs quais me apontaram o problema. O problema era em uma palavra que tinha sito atualizada a sintaxe de --TranspileOnly para --Transpile-only.

Encontrei dificuldades também na criação das querysbuildes com typeorm, quais achei um pouco confusa a documentação e me demandou mais tempo para estudo da mesma, como se trata de uma lib nova qual venho aprendendo na curso gostack. Infelizmente não consegui realizar algumas ligações de banco de dados e de verificação de rotas.

Funcionalidades não concluidas:

Rota de naver:

  /index: 
  A rota faz a pesquisa pela query, porém falta trazer somente os navers cadastrados pelo usuário.
  
  /show:
  A rota tras o naver solicitado, porém trás todos projetos, falta filtrar somente para os projetos que o naver participa.
  
Rota Projetos:

/show:
  A rota tras o projeto solicitado, porém trás todos navers, falta fltrar somente para os navers que participa do projeto
  
 /store:
 A rota cadastra o projeto, porém não está cadastrando o id do naver.
 
 
 Código:
 
 Faltou refatorar e distribuir algumas responsabildades do código nos arquivos de rotas.
 
 
 Tecnologias utilizadas:
 
 IDEA vscode
 insomnia
 docker
 typescript
 postgres
 typeorm
 eslint
 prettier
 bcryptsjs
 express
 express-async-errors
 jsonwebtoken
 reflect-metadata
 uuidv4
 
 
 
 
  
