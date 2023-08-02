import jspdf from "jspdf";
import { Draft } from "./draft";
import { State } from "./state";
import { Invoice } from "../models/invoice";
import { Work } from "../../works/models/work";

export class Published extends State {

    public state = 'Publicado'
        
    invoiceHeader: string = "Inscrita en el registro mercantil de [Ciudad], tomo [numTomo], hoja nº [numHoja]"

    companyName: string = "CONSTRUCCIONES N.A.M.E., S.L.\n       HNOS. NAMEE NAMEEEe"
    companyContact: string = "C/ INVENTADA Nº405 - Teléfonos 123 456 789 - 987 654 321 - 456 789 123\n              80599 POBLACION INVENTADA (Zaragoza)\n"+
    "                                          CIF: 999999999\n                         Email: email_email@hotmail.com"

    invoiceFooter: string = "De acuerdo con lo que establece el reglamento europeo de protección de datos "+
    "RGPD 2016/679 y la Ley Orgánica de Protección de datos y garantía de derechos digitales (LOPD-GDD) del "+
    "5 de diciembre de 2018, le informamos que los datos personales recogidos en este documento serán "+
    "incluidos en un fichero bajo responsabilidad de [NOMBRE EMPRESA], con la finalidad "+
    "de cumplir los compromisos entre ambos, pudiendo rectificar, u oponer sus datos personales en [DIRECCIÓN]"

    public transition(): void {
        this.context.transitionTo(new Draft());
    }

    public printPDF(rows: any[], iva: number, invoice: Invoice, work: Work): boolean {
        
        const doc = new jspdf();

        doc.setFontSize(9);
        
        let y: number = 0;
    
        y = this.setHeader(doc, invoice, work)   
        let text: string = "";
        
          let conceptText: string = "";
          let priceArray: string[] = []
          for (var i = 0; i < rows.length; i++) {
            conceptText += rows[i].concept+"\n\n";
            if(i < rows.length-1){
              conceptText += "--addedLineByRow--"+"\n"
            }
            priceArray.push("-"+rows[i].price.toString()+"€")
          }
          text = conceptText    
        
          let splitText: string[] = this.addPriceToText(doc, text, priceArray)
        
        
          let lineHeight = doc.getLineHeight() / doc.internal.scaleFactor
          let lines = splitText.length; 
    
          let totalPriceY: number = 0
    
          doc.text(splitText,15,y+=5);
    
          totalPriceY = totalPriceY + y + (lineHeight * lines)  
    
          doc.setFont("arial", "bold")
          doc.text("\n\n"+"Total: " ,15,totalPriceY);
          let totalPrice: string = this.calculateTotalPrice(priceArray);
          doc.text("\n\n"+totalPrice+"€",160,totalPriceY);
    
          this.setFooter(doc);
    
          this.populateFooter(doc, totalPrice, iva);
          
          
          doc.output('dataurlnewwindow');
          doc.save("factura_"+work.customer.firstName+"_"+work.customer.lastName)
          
          return true
    }

    setHeader(doc: jspdf, invoice: Invoice, work: Work): number{
        let y = 0;
        //HEADER
        this.setBodyFormat(doc)
        doc.text(this.invoiceHeader,15,y+=15);
        doc.addImage("assets/images/company.png", "png", 15, y+=5, 40, 40, "", "NONE", 0)
    
        this.setTitleFormat(doc);
        doc.text(this.companyName,60,y+=10)
    
        this.setBodyFormat(doc)
        doc.text(this.companyContact, 55, y+=13)
    
        let date = new Date();
        doc.text("Factura Nº: " + "1095674758-334"+"     "+"FECHA: "+invoice.date,15,y+=25);
        doc.text("Forma de pago: "+work.customer.bankAccount,15,y+5)
    
        this.setTitleFormat(doc);
        doc.text("Descripción",15,y+=15);
        doc.text("Importe",160,y)
    
        this.setBodyFormat(doc)
        doc.setFont("arial", "normal")
        y+=2
        doc.line(15,y,180,y)
    
        return y;
      }

      setFooter(doc: jspdf): number{   
        //FOOTER    
        let y = 260
        doc.line(15,260,180,260)
        doc.text("Base imponible",40,y+=3);
        doc.text("% IVA",70,y);
        doc.text("Cuota IVA",90,y);
    
        doc.setFont("arial", "bold")
        doc.text("Total factura",120,y);
        doc.line(15,265,180,y+=2);
    
        doc.setFont("arial", "normal");
    
        doc.text( doc.splitTextToSize(this.invoiceFooter, 180), 15, y+=8);
    
        return y;
      }
    
      populateFooter(doc: jspdf, totalPrice: string, iva: number){
        let price: number = 0;
        let ivaValue: number = 0;
        if(iva) ivaValue = iva;    
        
    
        doc.setFont("arial","bold")
    
        //Base imponible
        doc.text(totalPrice+"€",40,268);
         
        let ivaCalculated: number = 0;
        
    
        //Cuota IVA
        ivaCalculated = parseInt(totalPrice) * (+ivaValue/100); 
           
        //IVA
        doc.text(ivaValue.toString()+"%",70,268);
    
        //Cuota IVA
        doc.text(ivaCalculated.toFixed(2).toString()+"€",90,268);
        //Total factura
        doc.setFont("arial", "bold")
        let totalPriceInvoice: number = ivaCalculated + parseInt(totalPrice);
        
        doc.text(totalPriceInvoice.toString()+"€",120,268);
      }

      addPriceToText(doc: jspdf, text: string, priceArray: string[]): string[]{
        let splitText = doc.splitTextToSize(text, 130); //160   
        let stillPricesLeft=true
        let priceIterator = 0;
        for (var i = 0; i < splitText.length; i++) {
          if(stillPricesLeft){
            if(i>0){
              splitText[i-1] = this.fillTheLine(doc, splitText[i-1],priceArray[priceIterator])
              }
            else{
              splitText[i] = this.fillTheLine(doc, splitText[i],priceArray[priceIterator])
            }  
            priceIterator++;     
            stillPricesLeft = false;
          }
          if(splitText[i] == "--addedLineByRow--" && priceArray[priceIterator]){
            splitText.splice(i,1)
            stillPricesLeft = true;
          }
        }
      return splitText;
      }
    
      fillTheLine(doc:jspdf, line: string, price: string): string{
        let len = 145 - doc.getTextDimensions(line).w;
        let blankSpaces = "";
        if(doc.getTextDimensions(blankSpaces).w >= len) return line+price;
        while(doc.getTextDimensions(blankSpaces).w <= len){
          blankSpaces += " "
        }
        return line+blankSpaces+price;
              
      }
    
    
      calculateTotalPrice(priceArray: string[]): string{
        let res: number = 0;
        priceArray.forEach( element => {
          res += parseInt(element)
        })
        return res.toString();
      }
    
    
      deleteEndBlankSpaces(array: String[]){
        var i = array.length - 1
        while(array[i] === ""){
          array.pop()
          i--;
        } 
      }

      setTitleFormat(doc: jspdf){
        doc.setFont("arial", "bold")
        doc.setFontSize(15)
      }
    
      setBodyFormat(doc: jspdf){
        doc.setFont("arial", "normal")
        doc.setFontSize(9)
      }
}