README - Calculadora de Pegada Ecológica

Calculadora de Pegada Ecológica 🌍

Uma aplicação web interativa que calcula sua pegada ecológica baseada em hábitos de consumo. Através de um questionário simples, os usuários descobrem seu impacto ambiental e recebem recomendações personalizadas para um estilo de vida mais sustentável.



Tecnologias Utilizadas

    HTML5: Estrutura semântica com foco em acessibilidade

    CSS3: Design responsivo com variáveis CSS e abordagem mobile-first

    JavaScript Vanilla: Funcionalidades sem dependências externas

    LocalStorage API: Persistência de dados no navegador

Decisões Técnicas

    Vanilla JS: Optei por não usar frameworks para manter a aplicação leve e de fácil manutenção

    Armazenamento local: Todos os dados ficam no navegador do usuário, garantindo privacidade

    Design system: Sistema de cores e componentes consistentes com variáveis CSS

    Mobile-first: Desenvolvimento focado em dispositivos móveis


Como Rodar/Build

Desenvolvimento Local

    Clone o repositório: git clone https://github.com/julioCK/projeto_integrador_site_ecofootprint.git

    Navegue até a pasta do projeto: cd projeto_integrador_site_ecofootprint

    Sirva os arquivos com um servidor local:

            # Com Python
            python -m http.server 8000

            # Com Node.js (se tiver o http-server instalado)
            npx http-server

            # Com PHP
            php -S localhost:8000

                Acesse no navegador: http://localhost:8000

Build

Não é necessário processo de build, pois a aplicação é estática. Todos os arquivos estão prontos para produção.

Estrutura de Pastas

projeto_integrador_site_ecofootprint/
    /index.html          # Arquivo principal HTML
    /styles.css          # Estilos da aplicação
    /script.js           # Lógica JavaScript
    /README.md           # Este arquivo



Acessibilidade e Performance


Acessibilidade (WCAG 2.1 AA)

    ✅ Navegação completa por teclado

    ✅ Contraste adequado (≥ 4.5:1) em todos os elementos

    ✅ Semântica HTML apropriada

    ✅ Atributos ARIA quando necessário

    ✅ Foco visível em elementos interativos

    ✅ Suporte a leitores de tela

    ✅ Redução de movimento respeitando preferências do sistema

Performance

    ⚡ Carregamento rápido (Lighthouse: 92+)

    📦 Aplicação leve (menos de 100KB total)

    🖥️ Renderização otimizada

    📱 Design responsivo para todos os dispositivos


    Funcionalidades Implementadas

    Questionário interativo com 12 perguntas

    Cálculo automático da pegada ecológica

    Sistema de classificação (Baixa/Moderada/Alta)

    Recomendações personalizadas

    Histórico de resultados local

    Design responsivo

    Navegação acessível

    Persistência de dados no navegador

Próximas Melhorias

    Exportação de resultados em PDF

    Comparação com médias regionais

    Sistema de metas e acompanhamento

    Versão em outros idiomas

    Integração com PWA para funcionamento offline

    Compartilhamento nas redes sociais

    INTEGRANTES: JULIO CESAR CARDOSO