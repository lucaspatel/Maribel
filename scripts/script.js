// author: Jacob Patel

var lastBlob = {};

// bulma modal
// bulma toast

// or bulma notification, has js on docs page

// Set the paper info.

// avoid all this with map function

// This is not a constructor.

var currentPage;

lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry" + "s standard dummy" + "text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

function generatePaper() {

   pageCounter = 0;

   var studentName = document.getElementById('studentName').value;
   var profName = document.getElementById('profName').value;
   var className = document.getElementById('className').value;
   var dueDate = document.getElementById('dueDate').value;
   var paperTitle = document.getElementById('paperTitle').value;
   var paperContents = document.getElementById('paperContents').value;

   var doc = new PDFDocument({ autoFirstPage: false });
   var stream = doc.pipe(blobStream());

   // Set document MLA guidelines.
   doc
      .fontSize(12)
      .font('Times-Roman')
      .lineGap(18)

   doc.on('pageAdded', function () {
      doc.text(studentName, 72, 72)
      currentPage += 1;
   })

   // Set the page margins
   doc.addPage({
      margins: {
         top: 72,
         bottom: 72,
         left: 72,
         right: 72
      }
   });

   // Configure the heading in the top left corner.
   doc
      .text(studentName, 72, 72)
      .text(profName, 72, 108)
      .text(className, 72, 144)
      .text(dueDate, 72, 180)
      .text(paperTitle, {
         align: 'center'
      }
      );



   doc
      .text(lorem + lorem + lorem)

   doc
      .text(paperContents)


   // End and display the document in the iframe to the right
   doc.end();

   stream.on('finish', function () {
      var iframe = document.querySelector('embed');
      // get a blob you can do whatever you like with
      const blob = stream.toBlob('application/pdf');
      // or get a blob URL for display in the browser
      const url = stream.toBlobURL('application/pdf');
      lastBlob = blob;
      iframe.src = url;
   });

   quarter()
}

const downloadFile = (blob, fileName) => {
   const link = document.createElement('a');
   // create a blobURI pointing to our Blob
   link.href = URL.createObjectURL(blob);
   link.download = fileName;
   // some browser needs the anchor to be in the doc
   document.body.append(link);
   link.click();
   link.remove();
   // in case the Blob uses a lot of memory
   window.addEventListener('focus', e => URL.revokeObjectURL(link.href), { once: true });
};

function clearFields(idArray) {

   idArray.forEach(id => {
      document.getElementById(id).value = "";
   });
}

function quarter() {
   window.resizeTo(
      window.screen.availWidth / 2,
      window.screen.availHeight / 2
   );
}
