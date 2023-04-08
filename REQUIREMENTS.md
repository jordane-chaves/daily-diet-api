### Requisitos Funcionais

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível registrar uma refeição
- [x] Deve ser possível editar uma refeição
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível visualizar uma única refeição
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível recuperar as métricas de um usuário

### Regras de Negócio

- [x] O usuário não deve poder se cadastrar com e-mail duplicado
- [x] As refeições devem ser relacionadas a um usuário
- [x] Não deve ser possível editar uma refeição que não existe
- [x] Não deve ser possível apagar uma refeição que não existe
- [x] Não deve ser possível listar as refeições de outro usuário
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou
- [x] Deve ser possível identificar o usuário entre as requisições

### Requisitos não funcionais

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
