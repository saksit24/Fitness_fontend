import React, { Component } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { isCenter } from "bloomer/lib/bulma";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
    THSarabunNew: {
        normal: 'THSarabunNew.ttf',
        bold: 'THSarabunNew Bold.ttf',
        italics: 'THSarabunNew Italic.ttf',
        bolditalics: 'THSarabunNew BoldItalic.ttf'
    },
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
    }
}
class test00 extends Component {
    printPDF() {

        var docDefinition = {
            content: [
                {
                    text: 'ใบกำกับภาษี',
                    bold: true,
                    style: 'header',
                    alignment: 'center',
                    fontSize: 20
                },
                {
                    text: 'เล่มที่   1             เลขที่    20',
                    style: 'header',
                    alignment: 'right',
                    fontSize: 15
                },
                {
                    text: 'บริษัทบิ๊กแบร์ยิม จำกัด',
                    style: 'header',
                    alignment: 'left',
                    fontSize: 15
                },
                {
                    text: 'เลขที่ 3/207 ถนนศรีณคริทร์  แขวงหนองบอน เขตประเวศ กรุงเทพมหานคร 10260',
                    style: 'header',
                    alignment: 'left',
                    fontSize: 15
                },
                {
                    text: 'โทร. 0 2121231  0 28585855',
                    style: 'header',
                    alignment: 'left',
                    fontSize: 15
                },
                {
                    text: 'ใบกำกับภาษี เลขประจำตัวผู้เสียภาษี 3 0 1 1 9 2 1 9 5',
                    style: 'header',
                    alignment: 'left',
                    fontSize: 15
                },
                {
                    text: 'วันที่ 14 พฤษจิกายน 2562',
                    style: 'header',
                    alignment: 'left',
                    fontSize: 15,
                },
                '\n',
                {
                    text: 'ชื่อผู้ซื้อ นายศักดิ์สิทธิ์ แท่งทอง',
                    style: 'subheader',
                    alignment: 'left',
                    fontSize: 15,
                },
                '\n',
                ///////////////////////////////////////////////////////////////////////
                {
                    table: {
                        widths: [50, 150, 50, 100, 150],
                        heights: ['', '', 150, ''],
                        body: [
                            [{ text: 'ลำดับ', alignment: 'center' }, { text: 'รายการ', alignment: 'center' }, { text: 'จำนวน', alignment: 'center' }, { text: 'ราคาต่อหน่วย/บาท', alignment: 'center' }, { text: 'จำนวนเงิน/บาท', alignment: 'center' }],
                            [{ border: [true, true, true, false], text: '1', alignment: 'center' }, { border: [true, true, true, false], text: 'น้ำเปล่า', alignment: 'left' }, { border: [true, true, true, false], text: '2', alignment: 'center' }, { border: [true, true, true, false], text: '10 ', alignment: 'center' }, { border: [true, true, true, false], text: '20 ', alignment: 'center' }],
                            [{ border: [true, false, true, true], text: '2', alignment: 'center' }, { border: [true, false, true, true], text: 'น้ำดื่มสปอนเซอร์', alignment: 'left' }, { border: [true, false, true, true], text: '3', alignment: 'center' }, { border: [true, false, true, true], text: '15 ', alignment: 'center' }, { border: [true, false, true, true], text: '45 ', alignment: 'center' }],
                            [{ border: [false, false, false, false], text: '', alignment: 'center' }, { border: [false, false, false, false], text: '', alignment: 'left' }, { border: [false, false, false, false], text: '', alignment: 'center' }, { border: [false, false, false, false], text: 'ราคารวมทั้งหมด ', alignment: 'center' }, { border: [true, false, true, true], text: '65 ', alignment: 'center' }]
                        ]
                    },

                },
                '\n',
                '\n',
                {
                    text: 'จำนวนเงินทั้งสิน',
                    style: 'subheader',
                    alignment: 'left',
                    fontSize: 15,
                },
                {
                    text: '............................................',
                    style: 'subheader',
                    alignment: 'left',
                    fontSize: 15,
                },

                '\n',
                '\n',
                '\n',
                '\n',

                {
                    text: 'ลงชื่อ........................................................ผู้รับสินค้า                             ลงชื่อ........................................................ผู้ขาย',
                    style: 'subheader',
                    alignment: 'center',
                    fontSize: 15,
                },



            ],


            defaultStyle: {
                font: 'THSarabunNew'
            }
        }
        pdfMake.createPdf(docDefinition).open()
    }
    render() {
        return (

            <div onClick={() => { this.printPDF() }}>hhhhhh</div>

        )

    }

}
export default test00;