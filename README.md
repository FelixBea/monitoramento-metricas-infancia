# Monitoramento de Métricas da Infância

## Descrição
Projeto fullstack baseado em dados fictícios de crianças acompanhadas por progrmaas sociais do município.

Este projeto foi feito integralmente sem apoio de modelos de linguagem (IA), seja para geração de código como para pesquisa.

## Instruções para execução
Executar na pasta raiz do projeto: 
```docker compose up```

Observações: 
- Por limitações de tempo, só é possível executar o projeto para o ambiente de produção.
- Além disso, caso houvesse services para outros ambientes no compose.yaml, seriam necessários mais parâmetros ao executar docker compose up, o que fugiria das instruções iniciais.

## Estrutura do projeto
### Front end
Aplicação Next.js

Observações:
- A rota /login envia o request corretamente para a API, porém retorna um erro ainda não identificado até o final do desenvolvimento da versão atual desse projeto (fim do prazo).
- A rota /criancas, de forma semelhante, exibe parcialmente a lista de crianças 

### Back end
API Node (Express)

Endpoints:
POST /auth/token — autentica um técnico e retorna um JWT. Credenciais de teste: tecnico@prefeitura.rio / painel@2024
payload: {user: string, password: string}

GET /children — lista crianças com suporte a filtros (bairro, presença de alertas, status de revisão) e paginação
GET /children/:id — detalhe completo de uma criança
PATCH /children/:id/review — registra que o técnico autenticado revisou o caso (requer JWT)

Observações:
- Foi escolhida a linguagem Node pela disponibilidade de bibliotecas, curva de aprendizado menor e alta compatibilidade com MongoDB
- Todos os endpoints da API descritos acima estão funcionais e podem ser acessados com um client (browsers, Insomnia, Bruno, etc) localmente em http://locahost:5000 depois de executar docker compose up.
- Não foi possível entregar o endpoint GET /summary (agrega os dados para o painel) até o final do prazo.


### Banco de dados
MongoDB (connection com biblioteca Mongoose no Back end)

Observações:
- O projeto sofreu uma mudança no armazenamento dos dados fictícios ao longo do desenvolvimento. Acabou-se optando pelo MongoDB pela dificuldade de ler/escrever um arquivo .json simples.
- O MongoDB também tem como vantagens a rapidez na configuração e inserção direta de objetos com javascript, sendo bastante recomendado para uso com Node.

### Pendências do projeto e possíveis melhorias
O que faria diferente com mais tempo:

- Resolução de bugs
- Criar um service no arquivo compose.yaml para rodar containeres de todos os services em ambiente de desenvolvimento com docker compose api-dev
- Melhorar a separação de responsabilidades no service children
- Validar params do request nas rotas da API
