# Documentação Interativa com Next.js, MDX e Styled Components

Este projeto é uma plataforma de documentação técnica interativa, desenvolvida com **Next.js App Router**, **MDX**, **Styled Components** e funcionalidades avançadas como **Tabela de Conteúdos Dinâmica**, **Sidebar com Histórico de Acesso** e suporte a **cópia de código com um clique**.

##  Funcionalidades

- ✅ Suporte a arquivos MDX dinâmicos.
- ✅ Tabela de Conteúdos flutuante com destaque da seção atual.
- ✅ Sidebar com lista de documentos e seção de "Visitados Recentemente".
- ✅ Sistema de cópia de blocos de código com feedback visual (animação e efeito de brilho).
- ✅ Scroll inteligente com setas de navegação.
- ✅ Design moderno, responsivo e com tema dark elegante.

##  Tecnologias Utilizadas

- [Next.js 13+ (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MDX](https://mdxjs.com/)
- [Styled Components](https://styled-components.com/)
- [Lodash.debounce](https://lodash.com/docs/#debounce)
- [Lucide React Icons](https://lucide.dev/)

## 📂 Estrutura de Pastas

```plaintext
├── src
│   ├── components         # Componentes reutilizáveis (Sidebar, TOC, etc.)
│   ├── content            # Arquivos .mdx com os conteúdos
│   ├── hooks              # Hooks personalizados (useRecentlyVisited, useScrollArrows)
│   ├── lib                # Funções auxiliares (slugify, extractHeadings, etc.)
│   ├── styles             # Estilos com Styled Components
│   └── app                # Páginas e rotas (Next.js App Router)
```

##  Como Rodar Localmente

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Rode o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

4. Acesse em: [http://localhost:3000](http://localhost:3000)

##  Como Adicionar um Novo Documento

1. Acesse a pasta `/src/content`.
2. Crie um arquivo `.mdx`, por exemplo: `meu-tutorial.mdx`.
3. Adicione o frontmatter no início do arquivo:

```mdx
---
title: Meu Tutorial Incrível
---
```

4. Automaticamente ele estará disponível na sidebar e com ToC gerado.

##  Melhorias Futuras

- [ ] Implementar modo light/dark switch.
- [ ] Suporte a busca global nos documentos.
- [ ] Deploy automático com CI/CD (Vercel ou Netlify).
- [ ] Página customizada de 404 mais estilizada.

## Contribuições

Contribuições são bem-vindas! Sinta-se livre para abrir uma **issue** ou um **pull request**.

##  Licença

Este projeto está licenciado sob a licença [MIT](LICENSE).

---

Desenvolvido com 💙 por [Laversi](https://github.com/aversii)
