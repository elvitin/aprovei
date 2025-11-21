# Calculadora de Notas (Aprovei)

Uma aplicação web moderna para cálculo e gerenciamento de notas escolares, desenvolvida com React, TypeScript e Vite.

## 🚀 Funcionalidades

- **Gerenciamento de Bimestres**: Controle de notas e pesos para dois bimestres.
- **Cálculo Automático**: Médias e status (Aprovado/Exame/Reprovado) calculados em tempo real.
- **Conclusão de Bimestre**: Opção para "fechar" um bimestre, impedindo edições acidentais.
- **Análise Detalhada**:
  - Visualização de peso restante.
  - Cálculo de nota potencial máxima.
  - Indicador de possibilidade de aprovação sem exame.
  - Mensagens proativas sobre quanto falta para passar.
- **Modo Exame**: Interface dedicada para cálculo de nota de exame final quando necessário.
- **Configuração Flexível**: Defina suas próprias médias de aprovação e exame.
- **Interface Moderna**: Design responsivo e polido com Shadcn UI e Tailwind CSS.
- **Dark Mode**: Suporte automático ao tema do sistema.

## 🛠️ Tecnologias

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) (v4)
- [Shadcn UI](https://ui.shadcn.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) (Gerenciamento de Estado)
- [Biome](https://biomejs.dev/) (Linting e Formatação)

## 📦 Instalação e Uso

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/aprovei.git
   cd aprovei
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```
   Acesse `http://localhost:5173` no seu navegador.

4. **Build para produção**
   ```bash
   npm run build
   ```
   Os arquivos estáticos serão gerados na pasta `dist`.

## 🧹 Linting e Formatação

Este projeto utiliza o **Biome** para manter a qualidade do código.

- **Formatar código**:
  ```bash
  npm run fmt
  ```

- **Verificar lint**:
  ```bash
  npx @biomejs/biome lint .
  ```

## 📂 Estrutura do Projeto

- `src/components`: Componentes React reutilizáveis (Bimester, Exam, Summary, etc.).
- `src/store`: Gerenciamento de estado global com Zustand (`useGradeStore`).
- `src/hooks`: Lógica de cálculo de notas (`useGradeCalculations`).
- `src/lib`: Utilitários (Shadcn/Tailwind).

---

<div align="center">
  <p>Desenvolvido com ❤️ usando as melhores práticas de desenvolvimento web moderno.</p>
  <p>Desenvolvido com</p>
  <a href="https://antigravity.google/">
    <img src="src/assets/antigravity.png" alt="Antigravity" width="150">
  </a>
</div>
