# Sistema Distribuído de Vendas — Rede de Drogarias

Aplicação que simula a captação de dados de venda de uma rede de drogarias. O sistema é dividido em duas aplicações independentes (microsserviços) e um banco de dados relacional, todos executando em containers Docker:

- **API Principal** (porta 3000) — cadastros de cliente, vendedor e estoque, e processamento de vendas (receber e cancelar pedido).
- **API de Relatórios** (porta 3001) — geração dos relatórios estatísticos (somente leitura).
- **Banco de dados MySQL** (porta 3306) — armazena os dados, já populado com uma carga inicial de exemplo.

---

## Pré-requisitos

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) e Docker Compose

Não é necessário instalar Node ou MySQL na máquina: tudo roda dentro dos containers.

---

## Como executar

```bash
# 1. Clonar o repositório
git clone <link-do-repositorio>

# 2. Entrar na pasta do código-fonte (onde está o docker-compose.yml)
cd <nome-do-repositorio>/codigo_fonte

# 3. Construir as imagens e subir os três containers
docker compose up --build
```

Na primeira execução o banco é criado e populado automaticamente. Quando os três containers estiverem no ar, o sistema está pronto para uso.

**Para encerrar:** `Ctrl + C` e depois `docker compose down`
**Para apagar também os dados do banco:** `docker compose down -v`

### Serviços e portas

| Serviço            | URL base                  |
|--------------------|---------------------------|
| API Principal      | http://localhost:3000     |
| API de Relatórios  | http://localhost:3001     |
| Banco de dados     | localhost:3306            |

---

## Endpoints disponíveis

### API Principal (porta 3000)

CRUD genérico — `:tabela` pode ser `cliente`, `vendedor` ou `estoque`:

| Método | Rota             | Descrição                          |
|--------|------------------|------------------------------------|
| GET    | `/:tabela`       | Lista todos os registros.          |
| GET    | `/:tabela/:id`   | Busca um registro por ID.          |
| POST   | `/:tabela`       | Cria um registro (corpo em JSON).  |
| PUT    | `/:tabela/:id`   | Atualiza um registro por ID.       |
| DELETE | `/:tabela/:id`   | Remove um registro por ID.         |

Vendas (o CRUD direto em `/vendas` é bloqueado de propósito — use as rotas abaixo):

| Método | Rota                      | Descrição                                            |
|--------|---------------------------|-----------------------------------------------------|
| POST   | `/vendas/pedido`          | Recebe um pedido: valida e baixa o estoque.         |
| PUT    | `/vendas/:id/cancelar`    | Cancela um pedido e devolve a quantidade ao estoque.|

Exemplo de corpo para criar um pedido (`POST /vendas/pedido`):

```json
{
  "id_cliente": 1,
  "id_produto": 1,
  "qtd": 3,
  "id_vendedor": 1
}
```

Exemplo de corpo para criar um cliente (`POST /cliente`):

```json
{
  "nome": "Jorge Roberto",
  "data_nascimento": "1988-05-22",
  "email": "jorgeroberto@gmail.com"
}
```

### API de Relatórios (porta 3001)

| Método | Rota                                          | Descrição                                  |
|--------|-----------------------------------------------|--------------------------------------------|
| GET    | `/relatorios/produtos-mais-vendidos`          | Produtos mais vendidos.                    |
| GET    | `/relatorios/produtos-por-cliente`            | Produtos comprados por cada cliente.       |
| GET    | `/relatorios/consumo-medio`                   | Consumo médio por cliente.                 |
| GET    | `/relatorios/baixo-estoque?limite=80`         | Produtos com estoque baixo (`limite` opcional; padrão 50). |

---

## Arquivo `Requests.json` — coleção de requisições

Para facilitar os testes, o repositório inclui o arquivo **`Requests.json`**, uma coleção pronta com **todas as requisições que o sistema aceita** (cadastros, vendas e relatórios), já com os métodos, URLs e exemplos de corpo preenchidos.

Em vez de digitar cada requisição manualmente, basta importar esse arquivo no Insomnia ou no Postman e disparar as chamadas com um clique. O arquivo é uma exportação do **Insomnia** (por isso seu conteúdo está em formato de coleção do Insomnia, mesmo com a extensão `.json`).

### Importar no Insomnia

1. Abra o Insomnia.
2. No painel inicial (Dashboard), clique em **Import**.
3. Escolha **From File** e selecione o arquivo `Requests.json`.
4. A coleção **"Requisições do Sistema API"** aparecerá com as pastas API Principal (Cliente, Vendedor, Estoque, Vendas) e a requisição de relatório.

### Importar no Postman

1. Abra o Postman.
2. Clique em **Import** (canto superior esquerdo).
3. Arraste o arquivo `Requests.json` ou selecione-o pelo seletor de arquivos.
4. O Postman reconhece coleções do Insomnia e fará a importação.



## Estrutura do repositório

```
.
├── codigo_fonte/
│   ├── Principal API/        # serviço de cadastros e vendas (porta 3000)
│   ├── Relatorio API/        # serviço de relatórios (porta 3001)
│   └── docker-compose.yml    # orquestra os três containers
├── Relatorio/                # relatório do trabalho
├── Requests.json             # coleção de requisições (Insomnia/Postman)
└── README.md
```
