# Estados Invisiveis e Regulacao Emocional da Home

## Contexto

Este documento define os estados invisiveis de uso utilizados pelo app para
regular timing, estimulos e densidade da Home, garantindo uma experiencia
empatica, nao cobradora e alinhada ao proposito de apoio aos responsaveis.

Os estados descritos aqui nao sao exibidos ao usuario, nao geram textos
dedicados e nao aparecem como UI explicita. Eles existem exclusivamente para
orientar decisoes de renderizacao e comportamento do sistema.

## 1. Objetivo

Garantir que a Home:

- nao pressione o usuario por acao
- respeite momentos de maior carga emocional
- convide apenas quando houver ausencia real
- reflita cuidado por meio de silencio, nao mensagens

## 2. Estados Invisiveis

### 2.1 Estado Sensivel (SENSITIVE)

**Definicao**

Usuario que acessou recentemente conteudos emocionalmente densos ou
potencialmente disparadores.

**Exemplos de entrada**

- Paginas de suspeita de autismo
- Conteudos de desenvolvimento atipico
- Leituras prolongadas em contexto sensivel

**Janela temporal**

`now - lastSensitiveContentAccessAt <= X dias`

X deve ser curto e humano (ex.: 3–7 dias), definido como politica de produto.

**Regras de comportamento**

- ❌ Nenhum push (independente de inatividade)
- ❌ Nenhum convite a acao
- ❌ Nenhuma sugestao de registro
- ✅ Apenas leitura passiva se o usuario retornar
- ✅ Home neutra, sem metas ou indicadores de progresso

**Intencao**

Priorizar assimilacao emocional, nao acao.

### 2.2 Estado Ativo (ACTIVE)

**Definicao**

Usuario com presenca recente e intencional no app.

**Exemplos de entrada**

- Check-in concluido
- Registros manuais
- Navegacao ativa recente
- Interacoes distribuidas em mais de um dia

**Janela temporal**

`now - lastMeaningfulInteractionAt <= 7 dias`

**Regras de comportamento**

- ❌ Nenhum push
- ❌ Nenhum CTA de inicio ou registro
- ❌ Nenhuma urgencia temporal
- ✅ Continuidade silenciosa
- ✅ Conteudo passivo permitido

**Intencao**

Reconhecer presenca sem interromper.

### 2.3 Estado Silencioso (SILENT)

**Definicao**

Usuario sem interacao recente, sem sinais de carga emocional sensivel.

**Exemplos de entrada**

- Ausencia de interacoes significativas
- Ultimo contato neutro ou superficial

**Janela temporal**

`now - lastMeaningfulInteractionAt > 7 dias`

**Regras de comportamento**

- ✅ Convites leves e nao urgentes
- ✅ No maximo um CTA visivel
- ❌ Nenhuma linguagem de pendencia ou atraso
- ✅ Conteudo passivo sempre disponivel

**Intencao**

Convidar sem cobrar.

## 3. Hierarquia entre Estados

A hierarquia e fixa e obrigatoria:

1. SENSITIVE (sempre prevalece)
2. ACTIVE
3. SILENT

**Exemplos**

- Usuario ativo que acessou conteudo sensivel ontem -> SENSITIVE
- Usuario inativo ha 10 dias que acessou conteudo sensivel -> SENSITIVE
- Usuario ativo sem acesso sensivel -> ACTIVE

## 4. Traducao Conceitual para Logica

A determinacao do estado deve seguir a ordem abaixo:

```
if (isInSensitiveWindow) return SENSITIVE
if (isRecentlyActive) return ACTIVE
return SILENT
```

Esta logica nao deve gerar UI, textos explicativos ou logs verbosos.

## 5. Principios de Implementacao

- Estados sao internos, nao comunicados ao usuario
- Ausencia de estimulo e uma forma ativa de cuidado
- A Home nunca deve ser mais invasiva que o sistema de push
- Em caso de duvida entre mostrar algo ou esperar, esperar e a escolha padrao

## 6. Regra de Produto

O app nunca cobra algo que ele sabe que o usuario ja esta fazendo e nunca
explica por que nao cobrou.

## Status do Documento

- ✅ Decisao de produto consolidada
- ✅ Base para implementacao tecnica
- ✅ Referencia para regressao emocional e UX
