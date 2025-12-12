function loadPage(fileName) {

  const canvas = document.querySelector('#canvas');

  // HTML laden
  fetch(fileName)
    .then(response => response.text())
    .then(html => {

      // Inhalt ersetzen
      canvas.innerHTML = html;

      // alle BPMN-Blöcke suchen
      const bpmnBlocks = canvas.querySelectorAll('[data-diagram]');

      bpmnBlocks.forEach(block => {
        const diagramFile = block.getAttribute('data-diagram');

        const viewer = new BpmnJS({ container: block });

        fetch(diagramFile)
          .then(r => r.text())
          .then(xml => viewer.importXML(xml))
          .then(() => viewer.get('canvas').zoom('fit-viewport', { padding: 40 }))
          .catch(err => console.error("BPMN Fehler:", err));
      });

    })
    .catch(err => console.error("HTML Fehler:", err));
}





// Link-Handler (Sidebar)
document.querySelectorAll('.example-link').forEach(link => {

  link.addEventListener('click', e => {
    e.preventDefault();

    const file = link.getAttribute('data-template');

    document.querySelectorAll('.example-link')
      .forEach(l => l.classList.remove('active'));

    link.classList.add('active');

    loadPage(file);
  });

});

