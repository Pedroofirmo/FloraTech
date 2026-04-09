window.onload = function() {
    const form = document.getElementById('orcamentoForm');

    if (!form) {
        console.error("Formulário não encontrado!");
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const nomeValor = document.getElementsByName('nome')[0].value;
        const emailValor = document.getElementsByName('email')[0].value;
        const telValor = document.getElementsByName('telefone')[0].value;
        const empresaValor = document.getElementsByName('empresa')[0].value;
        const produtoValor = document.getElementsByName('produto')[0].value;
        const cidadeValor = document.getElementsByName('cidade')[0].value;
        const estadoValor = document.getElementsByName('estado')[0].value;
        const cultivoValor = document.getElementsByName('cultivo')[0].value || "Não informado";
        const obsValor = document.getElementsByName('obs')[0].value || "Sem observações.";

        doc.setFillColor(45, 90, 39); 
        doc.rect(0, 0, 210, 40, 'F');

        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(255, 255, 255);
        doc.text("FLORATECH", 20, 20);
        
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("Solicitação de Orçamento - Via Website", 20, 30);
        doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, 38);

        doc.autoTable({
            startY: 50,
            theme: 'grid',
            head: [['Campo', 'Informação']],
            body: [
                ['Cliente', nomeValor],
                ['E-mail', emailValor],
                ['Telefone', telValor],
                ['Empresa', empresaValor],
                ['Localidade', `${cidadeValor} - ${estadoValor}`],
                ['Produto', produtoValor],
                ['Cultivo', cultivoValor],
                ['Observações', obsValor]
            ],
            headStyles: { fillColor: [45, 90, 39] },
            styles: { fontSize: 10, cellPadding: 4 }
        });

        try {
            const nomeArquivo = nomeValor.trim() ? nomeValor.replace(/\s+/g, '_') : "Cliente";
            doc.save(`Orcamento_FloraTech_${nomeArquivo}.pdf`);

            const seuNumero = "5588992990673"; 

            const mensagem = `*🌱 NOVO ORÇAMENTO - FLORATECH*%0A%0A` +
                                `*👤 Cliente:* ${nomeValor}%0A` +
                                `*🏢 Empresa:* ${empresaValor}%0A` +
                                `*📦 Produto:* ${produtoValor}%0A` +
                                `*📍 Local:* ${cidadeValor} - ${estadoValor}%0A` +
                                `*🌿 Cultivo:* ${cultivoValor}%0A%0A` +
                                `_O cliente já recebeu o PDF técnico e aguarda seu contato!_`;

            const urlWhats = `https://api.whatsapp.com/send?phone=${seuNumero}&text=${mensagem}`;

            alert(" Tudo pronto! O PDF foi baixado. Clique em OK para abrir o WhatsApp e falar com a FloraTech.");
            
            window.open(urlWhats, '_blank');
            form.reset(); 

        } catch (error) {
            console.error("Erro no PDF:", error);
            alert("Erro ao gerar o arquivo. Tente novamente.");
        }
    });
};