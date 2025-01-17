// author: Jacob Patel

var lastBlob = {};


// This is not a constructor.

var currentPage;

var documentTitle;

var makeWorksCited = false;

var documentTitle;

// Main tool for generating the paper.
function generatePaper() {

   currentPage = 0;

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
      .lineGap(24)

   doc.on('pageAdded', function () {
      doc.moveUp()
      currentPage += 1;
      doc.text(getLastName(studentName) + ' ' + currentPage, {
         align: 'right'
      }
      );
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
   if (currentPage == 1) {
      doc
         .text(studentName, 72, 72)
         .text(profName, 72, 108)
         .text(className, 72, 144)
         .text(dueDate, 72, 180)
         .text(paperTitle, {
            align: 'center'
         }
         );

   }

   doc
      .text(paperContents)

   // edit the document's metadata
   if (paperTitle != "") {
      doc
      .info['Title'] = paperTitle
   } else {
      doc
      .info['Title'] = 'Maribel - MLA Formatter'
   }


   // Set the name to be saved of the document.
   documentTitle = paperTitle

   // Add the Works Cited page.

   if (makeWorksCited) {
      citations = document.getElementById('worksCited').value,

         doc
            .addPage()
            .text('Works Cited', {
               align: 'center'
            }
            )
   }




   var x;
   // for (x = 0; indivCitations.length; x++) {
   //    doc.text(indivCitations[x], {
   //       align: 'left'
   //    }
   //    );
   //    x++;
   // }


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
}

function getDocumentTitle() {
   if (documentTitle == "") {
      return "Maribel - MLA Formatter"
   } else {
      return documentTitle;
   }
}

function getLastName(fullName) {
   lastName = fullName.substring(fullName.indexOf(' ')+1)
   return lastName
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

// Clear all user inputted fields.
function clearFields(idArray) {

   idArray.forEach(id => {
      document.getElementById(id).value = "";
   });
}

// Event listener for the hamburger.
document.addEventListener('DOMContentLoaded', () => {

   // Get all "navbar-burger" elements
   const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

   // Check if there are any navbar burgers
   if ($navbarBurgers.length > 0) {

      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
         el.addEventListener('click', () => {

            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

         });
      });
   }

});

function fadeOut(id) {
   var elem = document.getElementById(id);
   elem.className = "fadeOut"
   return false;
}

function fadeIn(id) {
   var elem = document.getElementById(id);
   elem.className = "fadeIn"
   return false;
}

function removeItem(id) {
   var elem = document.getElementById(id);
   elem.parentNode.removeChild(elem);
}

function toggleWorksCited() {
   var x = document.getElementById("worksCited");
   if (x.style.display === "none") {
      document.getElementById("toggleWorksCited").textContent = 'Remove Works Cited'
      x.style.display = "block";
      makeWorksCited = true;
   } else {
      x.style.display = "none";
      document.getElementById("toggleWorksCited").textContent = 'Add Works Cited'
   }
}