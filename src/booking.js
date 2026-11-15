import './booking.css'

export function setupBooking() {
  const modal = document.createElement('dialog')
  modal.className = 'booking'
  modal.setAttribute('aria-labelledby', 'booking-title')
  modal.innerHTML = `
    <button class="booking__close" type="button" aria-label="Fechar agendamento">×</button>
    <span class="booking__eyebrow">SPINA CLINIC · DEMONSTRAÇÃO</span>
    <h2 id="booking-title">Um tempo para você.</h2>
    <p class="booking__lead">Simule sua consulta em poucos passos. Nenhum horário será reservado de verdade.</p>
    <ol class="booking__steps" aria-label="Etapas"><li>1. Consulta</li><li>2. Seus dados</li><li>3. Confirmação</li></ol>
    <form>
      <fieldset data-step="0"><legend>Escolha sua consulta</legend>
        <label>Atendimento<select name="service" required><option value="">Selecione um atendimento</option><option>Primeira consulta</option><option>Emagrecimento e nutrologia</option><option>Lipedema</option><option>Saúde hormonal</option><option>Soroterapia e terapias injetáveis</option><option>Modelagem corporal</option><option>Retorno</option></select></label>
        <label>Dia<select name="date" required><option value="">Selecione um dia</option></select></label>
        <fieldset class="booking__times"><legend>Horários ilustrativos</legend><div></div></fieldset>
        <button class="booking__primary" type="submit">Continuar <span aria-hidden="true">→</span></button>
      </fieldset>
      <fieldset data-step="1" hidden><legend>Como podemos chamar você?</legend>
        <p class="booking__selection"></p>
        <label>Nome<input name="name" autocomplete="off" placeholder="Ex.: Maria Silva" minlength="2" maxlength="80" required></label>
        <label>Telefone<input name="phone" type="tel" autocomplete="off" inputmode="tel" placeholder="(63) 99999-9999" required></label>
        <p class="booking__hint">Pode usar dados fictícios. Nada será enviado ou salvo.</p>
        <div class="booking__actions"><button class="booking__back" type="button">Voltar</button><button class="booking__primary" type="submit">Simular agendamento</button></div>
      </fieldset>
    </form>
    <section class="booking__success" hidden aria-live="polite"><span class="booking__check" aria-hidden="true">✓</span><h3>Simulação concluída!</h3><p class="booking__greeting"></p><dl></dl><p class="booking__hint">Este é um protótipo. A clínica não recebeu uma solicitação e nenhum horário foi reservado.</p><button class="booking__primary booking__done" type="button">Concluir</button></section>`
  document.body.append(modal)
  const form = modal.querySelector('form')
  const steps = [...form.querySelectorAll('[data-step]')]
  const fields = form.elements
  const success = modal.querySelector('.booking__success')
  let step = 0
  let opener
  let previousOverflow = ''
  const dateLabel = () => fields.date.selectedOptions[0].textContent
  function changeStep(next) {
    step = next
    steps.forEach((panel, i) => { panel.hidden = i !== next; panel.disabled = i !== next })
    modal.querySelectorAll('.booking__steps li').forEach((item, i) => {
      if (i === next) item.setAttribute('aria-current', 'step')
      else item.removeAttribute('aria-current')
    })
  }
  function populateDates() {
    fields.date.length = 1
    const day = new Date()
    day.setHours(12, 0, 0, 0)
    for (let count = 0; count < 10;) {
      day.setDate(day.getDate() + 1)
      if ([0, 6].includes(day.getDay())) continue
      const key = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`
      fields.date.add(new Option(day.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'long' }), key))
      count++
    }
  }
  modal.querySelector('.booking__times div').innerHTML = ['08:00', '09:30', '11:00', '14:00', '15:30', '17:00'].map(time => `<label><input type="radio" name="time" value="${time}" required><span>${time}</span></label>`).join('')
  document.querySelectorAll('.hero__button, .doctor__button, .faq__button').forEach(link => {
    link.setAttribute('href', '#agendamento')
    link.removeAttribute('target')
    link.setAttribute('aria-haspopup', 'dialog')
    link.addEventListener('click', event => {
      event.preventDefault()
      opener = link
      form.reset()
      populateDates()
      form.hidden = false
      success.hidden = true
      changeStep(0)
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      modal.showModal()
      fields.service.focus()
    })
  })
  form.addEventListener('submit', event => {
    event.preventDefault()
    if (step === 0) {
      modal.querySelector('.booking__selection').textContent = `${fields.service.value} · ${dateLabel()} às ${fields.time.value}`
      changeStep(1)
      fields.name.focus()
      return
    }
    if (!fields.name.value.trim()) { fields.name.setCustomValidity('Informe um nome.'); fields.name.reportValidity(); return }
    if (!/^\d{10,11}$/.test(fields.phone.value.replace(/\D/g, ''))) { fields.phone.setCustomValidity('Informe um telefone com DDD, com 10 ou 11 dígitos.'); fields.phone.reportValidity(); return }
    modal.querySelector('.booking__greeting').textContent = `${fields.name.value.trim()}, sua consulta demonstrativa ficou assim:`
    const summary = modal.querySelector('dl')
    summary.replaceChildren()
    for (const [label, value] of [['Atendimento', fields.service.value], ['Profissional', 'Dra. Gabriela Becker Spina'], ['Dia', dateLabel()], ['Horário', fields.time.value]]) {
      const dt = document.createElement('dt'); dt.textContent = label
      const dd = document.createElement('dd'); dd.textContent = value
      summary.append(dt, dd)
    }
    form.hidden = true
    success.hidden = false
    changeStep(2)
    modal.querySelector('.booking__done').focus()
  })
  form.addEventListener('input', event => { if (event.target.setCustomValidity) event.target.setCustomValidity('') })
  modal.querySelector('.booking__back').addEventListener('click', () => { changeStep(0); fields.service.focus() })
  modal.querySelectorAll('.booking__close, .booking__done').forEach(button => button.addEventListener('click', () => modal.close()))
  modal.addEventListener('click', event => {
    const r = modal.getBoundingClientRect()
    if (event.target === modal && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) modal.close()
  })
  modal.addEventListener('close', () => { document.body.style.overflow = previousOverflow; form.reset(); opener?.focus() })
  if (import.meta.hot) import.meta.hot.dispose(() => { if (modal.open) modal.close(); modal.remove() })
}
