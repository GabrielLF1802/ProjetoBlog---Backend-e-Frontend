# 📝 BlogNodeJS

Um projeto de blog desenvolvido com **Node.js**, **Express** e **MongoDB**, com sistema completo de autenticação, controle de permissões e painel administrativo.

---

## 🚀 Funcionalidades

- Cadastro e login de usuários com senhas criptografadas (bcryptjs)
- Controle de sessões com Passport.js
- Permissões por tipo de usuário:
  - 👤 **Usuário comum**: pode visualizar postagens
  - 🛡️ **Admin**: pode criar, editar e excluir postagens e categorias
- CRUD completo de:
  - 📂 Categorias
  - 📰 Postagens
- Interface com **Bootstrap**
- Mensagens de erro e sucesso com **connect-flash**
- URLs amigáveis usando slugs (`/postagem/titulo-do-post`)

---

## 🧰 Tecnologias utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- Passport.js
- bcryptjs
- express-session
- connect-flash
- Bootstrap

---


---

## 🔐 Controle de Acesso

- `isAuthenticated`: middleware que protege rotas para usuários logados
- `isAdmin`: middleware que permite acesso apenas a administradores

---

## ▶️ Como rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/BlogNodeJS.git
cd BlogNodeJS
```

2. Instale as dependências
 npm install

3. Configure o MongoDB (local ou Atlas)

4. Inicie o servidor
  npm start

5. Acesse: http://localhost:8081

📌 Observações
Este projeto foi criado com fins de estudo, focando em práticas reais de backend com Express.

Você pode evoluir ele facilmente para incluir:

Upload de imagens

Comentários

API REST

JWT em vez de sessões

✍️ Autor
Gabriel Lourenço
💼 Desenvolvedor backend em formação
📫 www.linkedin.com/in/gabriel-lourenço-97a833295
