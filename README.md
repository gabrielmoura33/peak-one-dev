# 4am Media - External Project

[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D16-brightgreen)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-13.4-blue)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-blue)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Este é um projeto desenvolvido em **Next.js**, utilizando **TypeScript** e **Tailwind CSS**, para criar um **Template 2** do portal de checkout.

## Objetivo

Reproduzir um template similar à página de checkout da [Oricle Hearing](https://www.oriclehearing.com/hear/checkout.php), com conteúdo dinâmico sendo referenciado a partir de arquivos Markdown. O projeto suporta múltiplos templates e utiliza uma arquitetura modular e escalável.

### Template Atual (Template 1)

[https://clean.buysplashcleaner.com/checkout](https://clean.buysplashcleaner.com/checkout)

### Template Desejado (Template 2)

[https://www.oriclehearing.com/hear/checkout.php](https://www.oriclehearing.com/hear/checkout.php)

## Estrutura do Projeto

- **Conteúdo Dinâmico**: Armazenado em arquivos Markdown na pasta raiz (exemplo: `/_checkout/splash-foam-checkout.md`).
- **Página Inicial**: O arquivo `/src/app/page.tsx` lê o conteúdo Markdown e o repassa para o componente `CheckoutPage`.
- **Renderização do Template**: O componente `CheckoutPage` (em `/src/app/_components/checkout-page.tsx`) escolhe o template correto com base no campo `info.template` especificado no arquivo Markdown.

## Recursos Utilizados

- **Next.js**: Framework para aplicações React.
- **TypeScript**: Superset de JavaScript para tipagem estática.
- **Tailwind CSS**: Framework de CSS utilitário.
- **Markdown**: Conteúdo dinâmico em arquivos `.md`.

## Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v16 ou superior)
- [Yarn](https://yarnpkg.com/) instalado globalmente

### Passos

1. **Clone o Repositório**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DA_PASTA_DO_REPOSITORIO>
   ```

2. **Instale as Dependências**
   ```bash
   yarn install
   ```

3. **Execute o Ambiente de Desenvolvimento**
   ```bash
   yarn dev
   ```

4. **Acesse no Navegador**
   Abra [http://localhost:3000](http://localhost:3000) para visualizar o projeto.

### Como Alternar Entre Templates

1. Edite o arquivo Markdown correspondente, por exemplo: `/_checkout/splash-foam-checkout.md`.
2. Atualize o campo `template` para o template desejado (e.g., `template: 1` ou `template: 2`).
3. Salve o arquivo e recarregue a página no navegador.

## Estilo de Código

Manter a organização dos arquivos, bem como a consistência nos estilos e tipos.

- **Organização dos Tipos**: Tipos devem ser claros e reutilizáveis.
- **Estrutura de Arquivos**: Componentes e arquivos devem ser bem organizados para facilitar a manutenção.

## Suporte

Em caso de dúvidas ou problemas, entre em contato com:

**E-mail**: gabrielmourajs@gmail.com

---

### Referências

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do Tailwind CSS](https://tailwindcss.com/docs)
- [Gray-Matter](https://github.com/jonschlinkert/gray-matter) para manipulação de metadados.
- [Remark](https://github.com/remarkjs/remark) para conversão de Markdown para HTML.

