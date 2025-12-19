document.onmousemove = reset;
document.onkeypress = reset;
this.valor;

// jQuery.sap.declare("com.spyvee.Component");

// (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//     (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//     m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
// })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

// ga('create', 'UA--', 'auto');


function reset() {
    clearTimeout(this.valor);
    this.valor = setTimeout(function () {
        window.location.replace('./logout');
        var dialog = new sap.m.Dialog({
            title: "Tiempo de sesión terminado ",
            type: "Message",
            state: "Warning",
            icon: "sap-icon://fob-watch",
            content: new sap.m.Text({
                text: "Se ha cerrado la sesión debido a que se ha superado el tiempo de inactividad.",
                wrapping: true
            }),
            beginButton: new sap.m.Button({
                text: "Aceptar",
                press: function () {
                    // sap.m.URLHelper.redirect("./index.html", false);
                    window.location.replace('./logout');
                    dialog.close();
                }
            }).addStyleClass("btnGen"),
            afterClose: function () {
                dialog.destroy();
            }
        });
        dialog.open();
    }.bind(this), 900000);
}
sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "nsrdos/uiportalprov_qas/model/models"
],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("nsrdos.uiportalprov_qas.Component", {
            
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();
                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                sap.ui.getCore().getConfiguration().setLanguage("ES");

                var oData = {
                    "buttonVisible": false,
                    "indicadorShowAnuncio": false,
                    "listurlBD": {
                        "bdClientes": "cpbl/browse/",
                        "bdClientes2": "cpdb/mydb/",
                    },
                    
                    "usuarioReal": "",
                    "tipoDeUsuario": "",
                    "usuarioRucDes": "",
                    "tipoOperacion": [],
                    "listUsuarios": [],
                    "listUsuariosValidar": [],

                    "listOpcUsuario": {
                        "cOpcUsuario": "0",
                    },

                    "listUsuPrincipal": {
                        "cUsuPrincipal": true,
                    },

                    "listServValReferencial": [{
                        "DE_NUM_MATERIAL": "PT00019",
                        "DE_DESCRIPCION": "EMPANIZADOR SF1"
                    }, {
                        "DE_NUM_MATERIAL": "PT00020",
                        "DE_DESCRIPCION": "EMPANIZADOR SF2"
                    }, {
                        "DE_NUM_MATERIAL": "PT00021",
                        "DE_DESCRIPCION": "EMPANIZADOR SF4"
                    }, {
                        "DE_NUM_MATERIAL": "PT00022",
                        "DE_DESCRIPCION": "EMPANIZADOR SF5"
                    }, {
                        "DE_NUM_MATERIAL": "PT00024",
                        "DE_DESCRIPCION": "EMPANIZADOR SF7"
                    }],

                    /*"listTipoCarga": [{
                        "clistTipoCargaDes": "TODOS",
                        "clistTipoCargaCod": "T"
                    }, {
                        "clistTipoCargaDes": "Consignación",
                        "clistTipoCargaCod": "N"
                    }, {
                        "clistTipoCargaDes": "Contratista",
                        "clistTipoCargaCod": "C"
                    }, {
                        "clistTipoCargaDes": "Nota de Cred. sin pedido",
                        "clistTipoCargaCod": "V"
                    }, {
                        "clistTipoCargaDes": "Suministros",
                        "clistTipoCargaCod": "S"
                    }, {
                        "clistTipoCargaDes": "Servicios",
                        "clistTipoCargaCod": "H"
                    }, {
                        "clistTipoCargaDes": "Miscelaneos",
                        "clistTipoCargaCod": "M"
                    }, {
                        "clistTipoCargaDes": "Nota de Cred. con pedido",
                        "clistTipoCargaCod": "D"
                    }],*/

                    "listTipoCarga": [{
                        "clistTipoCargaDes": "TODOS",
                        "clistTipoCargaCod": "T"
                    }, {
                        "clistTipoCargaDes": "Suministros",
                        "clistTipoCargaCod": "S"
                    }, {
                        "clistTipoCargaDes": "Servicios",
                        "clistTipoCargaCod": "H"
                    }, {
                        "clistTipoCargaDes": "Miscelaneos",
                        "clistTipoCargaCod": "M"
                    }, {
                        "clistTipoCargaDes": "Nota de Cred. con pedido",
                        "clistTipoCargaCod": "D"
                    }],

                    /*"listTablasOData": {
                        "clistTablasODataURL": "/odataent/odata2.svc",
                        "clistTablasODataDocument": "/DOCUMENT2/56bcebcf44460413b7434406/root",
                        "clistTablasODataDocumentConsultar": "/METODO/GuardarFTP2?nombre=",
                        "clistTablasODataT_CEN": "T_CENs",
                        "clistTablasODataT_CON": "T_CONs",
                        "clistTablasODataT_CON_DET": "T_CON_DETs",
                        "clistTablasODataT_ING": "T_INGs",
                        "clistTablasODataT_ING_DET": "T_ING_DETs",
                        "clistTablasODataT_ORD": "T_ORDs",
                        "clistTablasODataT_ORD_DET": "T_ORD_DETs",
                        "clistTablasODataT_CRONOGRAMA": "T_CRONOGRAMAs",
                        "clistTablasODataT_CTR_DET": "T_CTR_DETs",
                        "clistTablasODataT_DOC": "T_DOCs",
                        "clistTablasODataT_EMP": "T_EMPs",
                        "clistTablasODataT_FAC": "T_FACs",
                        "clistTablasODataT_FAC_DET": "T_FAC_DETs",
                        "clistTablasODataT_FAC_POS": "T_FAC_POSs",
                        "clistTablasODataT_OC": "T_OCs",
                        "clistTablasODataT_OC_DET": "T_OC_DETs",
                        "clistTablasODataT_TIP_CAR": "T_TIP_CARs",
                        "clistTablasODataT_USER": "T_USERs",
                        "clistTablasODataT_USUARIO_EMP": "T_USUARIO_EMPs",
                        "clistTablasODataT_USUARIO_PRO": "T_USUARIO_PROs",
                        "clistTablasODataT_USUARIO_LOGIN": "T_USUARIO_LOGINs",
                        "clistTablasODataT_SERVICIOS": "T_SERVICIOSs",
                        "clistTablasODataT_RESP_ORDEN": "T_RESP_ORDENs",

                        "clistTablasODataT_DETRACCION": "T_DETRACCIONs",
                        "clistTablasODataT_SERV_DETRACCION": "T_SERV_DETRACCIONs",
                        "clistTablasODataT_MAT_DETRACCION": "T_MAT_DETRACCIONs"
                    },*/
                    
                    "listTablasOData": {
                        "clistTablasODataURL": "/odataent/odata2.svc/mydb",
                        "clistTablasODataURL4": "/odataent/odata2.svc/myws",
                        "clistTablasODataDocument": "/DOCUMENT2/56bcebcf44460413b7434406/root",
                        "clistTablasODataDocumentConsultar": "/METODO/GuardarFTP2?nombre=",
                        "clistTablasODataT_FAC_DET_INSERT": "T_FAC_DET_INSERT",
                        "clistTablasODataT_FAC_POS_INSERT": "T_FAC_POS_INSERT",
                        "clistTablasODataT_OC_DET_UPDATE": "T_OC_DET_UPDATE",
                        "clistTablasODataT_CEN": "T_CEN",
                        "clistTablasODataT_CON": "T_CON",
                        "clistTablasODataT_CON_DET": "T_CON_DET",
                        "clistTablasODataT_ING": "T_ING",
                        "clistTablasODataT_ING_DET": "T_ING_DET",
                        "clistTablasODataT_ORD": "T_ORD",
                        "clistTablasODataT_ORD_DET": "T_ORD_DET",
                        "clistTablasODataT_CRONOGRAMA": "T_CRONOGRAMA",
                        "clistTablasODataT_CTR_DET": "T_CTR_DET",
                        "clistTablasODataT_DOC": "T_DOC",
                        "clistTablasODataT_EMP": "T_EMP",
                        "clistTablasODataT_FAC": "T_FAC",
                        "clistTablasODataT_FAC_DET": "T_FAC_DET",
                        "clistTablasODataT_FAC_POS": "T_FAC_POS",
                        "clistTablasODataT_OC": "T_OC",
                        "clistTablasODataT_OC_DET": "T_OC_DET",
                        "clistTablasODataT_TIP_CAR": "T_TIP_CAR",
                        "clistTablasODataT_USER": "T_USER",
                        "clistTablasODataT_USUARIO_EMP": "T_USUARIO_EMP",
                        "clistTablasODataT_USUARIO_PRO": "T_USUARIO_PRO",
                        "clistTablasODataT_USUARIO_LOGIN": "T_USUARIO_LOGIN",
                        "clistTablasODataT_SERVICIOS": "T_SERVICIOS",
                        "clistTablasODataT_RESP_ORDEN": "T_RESP_ORDEN",
                        "clistTablasODataT_DETRACCION": "T_DETRACCION",
                        "clistTablasODataT_SERV_DETRACCION": "T_SERV_DETRACCION",
                        "clistTablasODataT_MAT_DETRACCION": "T_MAT_DETRACCION"
                    },

                    "codigoDetr": [{
                        "codigo": "NA",
                        "descripcion": "No Aplica",
                        "porcent": "",
                        "monto": "0"
                    }, {
                        "codigo": "00",
                        "descripcion": "Autodetraccion acreedores",
                        "porcent": "",
                        "monto": "0"
                    }, {
                        "codigo": "01",
                        "descripcion": "Azúcar y melaza de caña",
                        "porcent": "10",
                        "monto": "2200"
                    }, {
                        "codigo": "03",
                        "descripcion": "Alcohol etílico",
                        "porcent": "10",
                        "monto": "700"
                    }, {
                        "codigo": "05",
                        "descripcion": "Maíz amarillo duro",
                        "porcent": "4",
                        "monto": "700"
                    }, {
                        "codigo": "08",
                        "descripcion": "Madera",
                        "porcent": "4",
                        "monto": "700"
                    }, {
                        "codigo": "09",
                        "descripcion": "Arena y piedra",
                        "porcent": "10",
                        "monto": "700"
                    }, {
                        "codigo": "10",
                        "descripcion": "Residuos, subproductos, desechos, recortes, desperdicio",
                        "porcent": "15",
                        "monto": "0"
                    }, {
                        "codigo": "11",
                        "descripcion": "Bieneses gravados con IGV R.exon",
                        "porcent": "10",
                        "monto": "700"
                    }, {
                        "codigo": "12",
                        "descripcion": "Interm. Laboral y tercerizacion",
                        "porcent": "12",
                        "monto": "700"
                    }, {
                        "codigo": "14",
                        "descripcion": "Carnes y despojos comestibles",
                        "porcent": "4",
                        "monto": "700"
                    }, {
                        "codigo": "16",
                        "descripcion": "Aceite de pescado",
                        "porcent": "10",
                        "monto": "700"
                    }, {
                        "codigo": "17",
                        "descripcion": "Harina polvo y pellets de pescado",
                        "porcent": "4",
                        "monto": "700"
                    }, {
                        "codigo": "19",
                        "descripcion": "Arrendamiento de bienes",
                        "porcent": "10",
                        "monto": "700"
                    }, {
                        "codigo": "20",
                        "descripcion": "Mant. Y reparacion Bs muebles",
                        "porcent": "12",
                        "monto": "700"
                    }, {
                        "codigo": "21",
                        "descripcion": "Movimiento de carga",
                        "porcent": "10",
                        "monto": "700"
                    }, {
                        "codigo": "22",
                        "descripcion": "Otros servicios empresariales",
                        "porcent": "12",
                        "monto": "700"
                    }, {
                        "codigo": "25",
                        "descripcion": "Fabricacion de bienes por encargo",
                        "porcent": "10",
                        "monto": "700"
                    }, {
                        "codigo": "26",
                        "descripcion": "Servicio de transporte personas",
                        "porcent": "10",
                        "monto": "700"
                    }, {
                        "codigo": "27",
                        "descripcion": "Servicio de transporte bienes",
                        "porcent": "4",
                        "monto": "400"
                    }, {
                        "codigo": "30",
                        "descripcion": "Contratos de construccion",
                        "porcent": "4",
                        "monto": "700"
                    }, {
                        "codigo": "32",
                        "descripcion": "Papikra y otros frutos",
                        "porcent": "10",
                        "monto": "700"
                    }, {
                        "codigo": "35",
                        "descripcion": "Bienes exonerados del IGV",
                        "porcent": "1.5",
                        "monto": "700"
                    }, {
                        "codigo": "37",
                        "descripcion": "Demas servicios gravados con IGV",
                        "porcent": "12",
                        "monto": "700"
                    }, {
                        "codigo": "39",
                        "descripcion": "Minerales no metalicos",
                        "porcent": "10",
                        "monto": "700"
                    }, {
                        "codigo": "99",
                        "descripcion": "ley N°30737",
                        "porcent": "8",
                        "monto": "0"
                    }],
                    "tipoValeIngreso": [{
                        "opcion": "S",
                        "descripcion": "Suministros"
                    }, {
                        "opcion": "H",
                        "descripcion": "Hoja de Servicio"
                    }],
                    "tipoValeIngresoN": [{
                        "opcion": "N",
                        "descripcion": "Consignación"
                    }],
                    "tipoValeIngresoM": [{
                        "opcion": "M",
                        "descripcion": "Misceláneos"
                    }],
                    "tipoValeIngresoV": [{
                        "opcion": "V",
                        "descripcion": "Pedido Sin Devolución"
                    }],
                    "tipoValeIngresoD": [{
                        "opcion": "D",
                        "descripcion": "Devolución"
                    }],
                    "tipoValeIngresoC": [{
                        "opcion": "C",
                        "descripcion": "Contratista"
                    }],
                    "listaValesIngreso": [],
                    "listaEmpresasRUC": [
                        /*{
                                            "descripcion": "Los Quenuales S.A.",
                                            "codigo": "20332907990"
                                        }, {
                                            "descripcion": "Perubar S.A.",
                                            "codigo": "20100136237"
                                        }, {
                                            "descripcion": "Inversiones República S.A",
                                            "codigo": "20101009255"
                                        }, {
                                            "descripcion": "Glencore Peru S.A.C.",
                                            "codigo": "20524489300"
                                        }*/
                    ],
                    "listCentroEmp": [],
                    "afectacionIGV": [{
                        "valor": "10",
                        "tipo": "Gravado",
                        "descripcion": "Gravado - Operación Onerosa",
                        "opcion": "si",
                    }, {
                        "valor": "11",
                        "tipo": "Gravado",
                        "descripcion": "Retiro por premio",
                        "opcion": "si",
                    }, {
                        "valor": "12",
                        "tipo": "Gravado",
                        "descripcion": "Retiro por donación",
                        "opcion": "si",
                    }, {
                        "valor": "13",
                        "tipo": "Gravado",
                        "descripcion": "Retiro",
                        "opcion": "si",
                    }, {
                        "valor": "14",
                        "tipo": "Gravado",
                        "descripcion": "Retiro por publicidad",
                        "opcion": "si",
                    }, {
                        "valor": "15",
                        "tipo": "Gravado",
                        "descripcion": "Bonificaciones",
                        "opcion": "si",
                    }, {
                        "valor": "16",
                        "tipo": "Gravado",
                        "descripcion": "Retiro por entrega a trabajadores",
                        "opcion": "si",
                    }, {
                        "valor": "17",
                        "tipo": "Gravado",
                        "descripcion": "IVAP",
                        "opcion": "si",
                    }, {
                        "valor": "20",
                        "tipo": "Exonerado",
                        "descripcion": "Operación Onerosa",
                        "opcion": "no",
                    }, {
                        "valor": "21",
                        "tipo": "Exonerado",
                        "descripcion": "Transferencia Gratuita",
                        "opcion": "no",
                    }, {
                        "valor": "30",
                        "tipo": "Inafecto",
                        "descripcion": "Operación Onerosa",
                        "opcion": "no",
                    }, {
                        "valor": "31",
                        "tipo": "Inafecto",
                        "descripcion": "Retiro por Bonificación",
                        "opcion": "no",
                    }, {
                        "valor": "32",
                        "tipo": "Inafecto",
                        "descripcion": "Retiro",
                        "opcion": "no",
                    }, {
                        "valor": "33",
                        "tipo": "Inafecto",
                        "descripcion": "Retiro por Muestras Médicas",
                        "opcion": "no",
                    }, {
                        "valor": "34",
                        "tipo": "Inafecto",
                        "descripcion": "Retiro por Convenio Colectivo",
                        "opcion": "no",
                    }, {
                        "valor": "35",
                        "tipo": "Inafecto",
                        "descripcion": "Retiro por premio",
                        "opcion": "no",
                    }, {
                        "valor": "36",
                        "tipo": "Inafecto",
                        "descripcion": "Retiro por publicidad",
                        "opcion": "no",
                    }, {
                        "valor": "40",
                        "tipo": "Inafecto",
                        "descripcion": "Exportación",
                        "opcion": "no",
                    }],
                    "dateManual": new Date(),
                    "listItemFacturaPosicion": [],
                    "clistItemsOrdenCompra": [],
                    "listFactura": [],
                    "subTotal": [],
                    "bindingOrdenCompra": {},
                    "ordeCompraDetSeleccionada": [],
                    "eventAtras": "",
                    "listItemFacturasaux0": [],
                    "listItemFacturas": [],
                    "listItemFacturasLenght": "0",
                    "listDocAdjuntarFacLenght": "0",
                    "listDocAdjuntarFac": [],
                    "modoOC": "ordenCompra",
                    "documentoXML": "",
                    "usuarioLogin": "",
                    "sunatUsuario": "",
                    "sunatContrasena": "",
                    "selectItemTodos": {
                        "opc": false
                    },
                    "selectFiltro": {
                        "opc": false
                    },
                    "listDocAdjuntarOC": [{
                        "nombreAjd": "Documento de verificación",
                        "nombreUsu": "",
                        "formato": "Word",
                        "fmt": "DOCX",
                        "tamano": "",
                        "tipo": "Obligatorio",
                        "estado": "No Cargado",
                        "fecha": "",
                        "hora": "",
                        "file": "",
                        "fechaUsu": "",
                        "horaUsu": ""
                    }, {
                        "nombreAjd": "Firma digital",
                        "nombreUsu": "",
                        "formato": "Imagen JPGE",
                        "fmt": "JPG",
                        "tamano": "",
                        "tipo": "No Obligatorio",
                        "estado": "No Cargado",
                        "fecha": "",
                        "hora": "",
                        "file": "",
                        "fechaUsu": "",
                        "horaUsu": ""
                    }, {
                        "nombreAjd": "Documento de validación",
                        "nombreUsu": "",
                        "formato": "PDF",
                        "fmt": "PDF",
                        "tamano": "",
                        "tipo": "Obligatorio",
                        "estado": "No Cargado",
                        "fecha": "",
                        "hora": "",
                        "file": "",
                        "fechaUsu": "",
                        "horaUsu": ""
                    }],

                    "listTipoDocumento": [{
                        "clistTipoDocumentoCodigo": "01",
                        "clistTipoDocumentoDescripcion": "FACTURA"
                    }, {
                        "clistTipoDocumentoCodigo": "03",
                        "clistTipoDocumentoDescripcion": "BOLETA DE VENTA"
                    }, {
                        "clistTipoDocumentoCodigo": "07",
                        "clistTipoDocumentoDescripcion": "NOTA DE CREDITO"
                    }, {
                        "clistTipoDocumentoCodigo": "08",
                        "clistTipoDocumentoDescripcion": "NOTA DE DEBITO"
                    }],

                    "tblFiltros": [{
                        "ctblFiltrosTipo": "Nombre de Centro Logístico"
                    }, {
                        "ctblFiltrosTipo": "Inicio de Periodo"
                    }, {
                        "ctblFiltrosTipo": "Código de Centro Logístico"
                    }],

                    // Lista de Ordenes de Compra
                    "listOrdenCompra": [],
                    "listCheck": {},
                    "listCheckAsignacion": {
                        "rOpc": false
                    },

                    "listItemCabeceraFactura": [{
                        "label": "Versión del UBL",
                        "value": "-----"
                    }, {
                        "label": "Numeración de la Factura",
                        "value": "-----"
                    }, {
                        "label": "Fecha de Emisión",
                        "value": "-----"
                    }, {
                        "label": "Nombres o Denominación o Razón Social",
                        "value": "-----"
                    }, {
                        "label": "Nombre Comercial",
                        "value": "-----"
                    }, {
                        "label": "Número de RUC",
                        "value": "-----"
                    }, {
                        "label": "Tipo de documento",
                        "value": "-----"
                    }, {
                        "label": "Tipo de detracción",
                        "value": "-----"
                    }, {
                        "label": "Número de RUC del adquirente o usuario",
                        "value": "-----"
                    }, {
                        "label": "Nombres o Denominación o Razón Social del adquirente o usuario",
                        "value": "-----"
                    }, {
                        "label": "Moneda",
                        "value": "-----"
                    }, {
                        "label": "Tasa de IGV",
                        "value": "-----"
                    }],

                    "listItemDetalleFactura": [],
                    "listItemFiltroEntregado": [{
                        "clistItemFiltroEntregadoAno": "2019",
                        "clistItemFiltroEntregadoBUKRS": "1030",
                        "clistItemFiltroEntregadoCantidad": "25",
                        "clistItemFiltroEntregadoCantidadFac": "0",
                        "clistItemFiltroEntregadoDescripcion": "Descripcion 1",
                        "clistItemFiltroEntregadoDireccionEntrega": "Direccion 1",
                        "clistItemFiltroEntregadoEstado": "ENTREGADO",
                        "clistItemFiltroEntregadoFechaRegistro": "20190524",
                        "clistItemFiltroEntregadoGuiaRemision": "Guia 1",
                        "clistItemFiltroEntregadoIdCrono": "14",
                        "clistItemFiltroEntregadoMoneda": "PEN",
                        "clistItemFiltroEntregadoNumDocMaterial": "46859",
                        "clistItemFiltroEntregadoNumMaterial": "7958",
                        "clistItemFiltroEntregadoOrdenCompra": "4500000022",
                        "clistItemFiltroEntregadoPosicion": "2",
                        "clistItemFiltroEntregadoPrecio": "25",
                        "clistItemFiltroEntregadoValorNeto": "625"
                    }, {
                        "clistItemFiltroEntregadoAno": "2018",
                        "clistItemFiltroEntregadoBUKRS": "1031",
                        "clistItemFiltroEntregadoCantidad": "11",
                        "clistItemFiltroEntregadoCantidadFac": "0",
                        "clistItemFiltroEntregadoDescripcion": "Descripcion 2",
                        "clistItemFiltroEntregadoDireccionEntrega": "Direccion 2",
                        "clistItemFiltroEntregadoEstado": "ENTREGADO",
                        "clistItemFiltroEntregadoFechaRegistro": "20180612",
                        "clistItemFiltroEntregadoGuiaRemision": "Guia 2",
                        "clistItemFiltroEntregadoIdCrono": "15",
                        "clistItemFiltroEntregadoMoneda": "PEN",
                        "clistItemFiltroEntregadoNumDocMaterial": "498312",
                        "clistItemFiltroEntregadoNumMaterial": "7953321",
                        "clistItemFiltroEntregadoOrdenCompra": "4500000022",
                        "clistItemFiltroEntregadoPosicion": "3",
                        "clistItemFiltroEntregadoPrecio": "70",
                        "clistItemFiltroEntregadoValorNeto": "700"
                    }],
                    "listItemFiltroAceptado": [{
                        "clistItemFiltroAceptadoAno": "2012",
                        "clistItemFiltroAceptadoBUKRS": "1090",
                        "clistItemFiltroAceptadoCantidad": "5",
                        "clistItemFiltroAceptadoCantidadFac": "0",
                        "clistItemFiltroAceptadoDescripcion": "Descripcion 1",
                        "clistItemFiltroAceptadoDireccionEntrega": "Direccion 1",
                        "clistItemFiltroAceptadoEstado": "ACEPTADO",
                        "clistItemFiltroAceptadoFechaAceptacion": "20120714",
                        "clistItemFiltroAceptadoHojaEntrada": "100000775",
                        "clistItemFiltroAceptadoIdCrono": "25",
                        "clistItemFiltroAceptadoMoneda": "PEN",
                        "clistItemFiltroAceptadoNumAceptacion": "462538",
                        "clistItemFiltroAceptadoNumDocMaterial": "5000001712",
                        "clistItemFiltroAceptadoOrdenCompra": "4200000256",
                        "clistItemFiltroAceptadoPosicion": "2",
                        "clistItemFiltroAceptadoPrecio": "8000",
                        "clistItemFiltroAceptadoServicio": "486589",
                        "clistItemFiltroAceptadoValorNeto": "40000"
                    }, {
                        "clistItemFiltroAceptadoAno": "2011",
                        "clistItemFiltroAceptadoBUKRS": "1100",
                        "clistItemFiltroAceptadoCantidad": "7",
                        "clistItemFiltroAceptadoCantidadFac": "0",
                        "clistItemFiltroAceptadoDescripcion": "Descripcion 2",
                        "clistItemFiltroAceptadoDireccionEntrega": "Direccion 2",
                        "clistItemFiltroAceptadoEstado": "ACEPTADO",
                        "clistItemFiltroAceptadoFechaAceptacion": "20110508",
                        "clistItemFiltroAceptadoHojaEntrada": "100000951",
                        "clistItemFiltroAceptadoIdCrono": "29",
                        "clistItemFiltroAceptadoMoneda": "PEN",
                        "clistItemFiltroAceptadoNumAceptacion": "462465",
                        "clistItemFiltroAceptadoNumDocMaterial": "500000713",
                        "clistItemFiltroAceptadoOrdenCompra": "4200000256",
                        "clistItemFiltroAceptadoPosicion": "3",
                        "clistItemFiltroAceptadoPrecio": "4000",
                        "clistItemFiltroAceptadoServicio": "794612",
                        "clistItemFiltroAceptadoValorNeto": "28000"
                    }],
                    "listSelectDetalleFacturaEntregado": [],
                    "listSelectDetalleFacturaAceptado": [],
                    "listVizualizarDetFacEntregado": {},
                    "listVizualizarDetFacAceptado": {},
                    "listItemCronFacEntregado": [],
                    "listItemCronFacAceptado": [],

                    pages: [{
                        pageId: "companyPageId",
                        header: "Factura Electrónica",
                        title: "Factura Electrónica",
                        icon: "sap-icon://sales-order-item",
                        description: "-Sin asignar-",
                        groups: [{
                            heading: "Cabecera de la Factura",
                            elements: [{
                                label: "Fecha de Emisión",
                                value: "14/05/2017",
                                elementType: sap.m.QuickViewGroupElementType.text
                            }, {
                                label: "Nombres o Denominación o Razón Social",
                                value: "Soporte Tecnológicos EIRL",
                                elementType: sap.m.QuickViewGroupElementType.text
                            }, {
                                label: "Nombre Comercial",
                                value: "Tu Soporte",
                                elementType: sap.m.QuickViewGroupElementType.text
                            }, {
                                label: "Número de RUC",
                                value: "20100454523",
                                elementType: sap.m.QuickViewGroupElementType.text
                            }, {
                                label: "Tipo de documento",
                                value: "01",
                                elementType: sap.m.QuickViewGroupElementType.text
                            }, {
                                label: "Número de RUC del adquirente o usuario",
                                value: "20587896411",
                                elementType: sap.m.QuickViewGroupElementType.text
                            }, {
                                label: "Nombres o Denominación o Razón Social del adquirente o usuario",
                                value: "Servicabinas S.A.",
                                elementType: sap.m.QuickViewGroupElementType.text
                            }, {
                                label: "Moneda",
                                value: "PEN",
                                elementType: sap.m.QuickViewGroupElementType.text
                            }, {
                                label: "Tasa de IGV",
                                value: "18%",
                                elementType: sap.m.QuickViewGroupElementType.text
                            }]
                        }]
                    }],

                    /*"listItemDetalleFactura": [{
                        "clistItemDetalleFacturaPosicion": "1",
                        "clistItemDetalleFacturaCodigo": "GLG199",
                        "clistItemDetalleFacturaDescripcion": "Grabadora LG Externo Modelo: GE20LU10",
                        "clistItemDetalleFacturaUniMedida": "UND",
                        "clistItemDetalleFacturaCantidad": "2000",
                        "clistItemDetalleFacturaPreUnixItem": "83.05",
                        "clistItemDetalleFacturaPreVenxItem": "98.00",
                        "clistItemDetalleFacturaTotIGVxItem": "26,908.47",
                        "clistItemDetalleFacturaValorVenxItem": "149,491.53"
                    }, {
                        "clistItemDetalleFacturaPosicion": "2",
                        "clistItemDetalleFacturaCodigo": "MVS546",
                        "clistItemDetalleFacturaDescripcion": "Monitor LCD ViewSonic VG2028WM 20",
                        "clistItemDetalleFacturaUniMedida": "UND",
                        "clistItemDetalleFacturaCantidad": "300",
                        "clistItemDetalleFacturaPreUnixItem": "525.42",
                        "clistItemDetalleFacturaPreVenxItem": "620.00",
                        "clistItemDetalleFacturaTotIGVxItem": "24,116.95",
                        "clistItemDetalleFacturaValorVenxItem": "133,983.05"
                    }, {
                        "clistItemDetalleFacturaPosicion": "3",
                        "clistItemDetalleFacturaCodigo": "MPC35",
                        "clistItemDetalleFacturaDescripcion": "Memoria DDR-3 B1333 Kingston",
                        "clistItemDetalleFacturaUniMedida": "UND",
                        "clistItemDetalleFacturaCantidad": "250",
                        "clistItemDetalleFacturaPreUnixItem": "52.00",
                        "clistItemDetalleFacturaPreVenxItem": "52.00",
                        "clistItemDetalleFacturaTotIGVxItem": "0.00",
                        "clistItemDetalleFacturaValorVenxItem": "13,000.00"
                    }, {
                        "clistItemDetalleFacturaPosicion": "4",
                        "clistItemDetalleFacturaCodigo": "TMS22",
                        "clistItemDetalleFacturaDescripcion": "Teclado Microsoft SideWinder X6",
                        "clistItemDetalleFacturaUniMedida": "UND",
                        "clistItemDetalleFacturaCantidad": "500",
                        "clistItemDetalleFacturaPreUnixItem": "166.10",
                        "clistItemDetalleFacturaPreVenxItem": "196.00",
                        "clistItemDetalleFacturaTotIGVxItem": "14,949.15",
                        "clistItemDetalleFacturaValorVenxItem": "83,050.85"
                    }, {
                        "clistItemDetalleFacturaPosicion": "5",
                        "clistItemDetalleFacturaCodigo": "WCG01",
                        "clistItemDetalleFacturaDescripcion": "Web cam Genius iSlim 310",
                        "clistItemDetalleFacturaUniMedida": "UND",
                        "clistItemDetalleFacturaCantidad": "1",
                        "clistItemDetalleFacturaPreUnixItem": "0.00",
                        "clistItemDetalleFacturaPreVenxItem": "0.00",
                        "clistItemDetalleFacturaTotIGVxItem": "0.00",
                        "clistItemDetalleFacturaValorVenxItem": "0.00"
                    }],*/

                    // TABLAS DE OPCIONES

                    "listOpcion": {},

                    // CABECERA

                    "listConsultaResumenOrden": {},

                    // COMBO BOX

                    // Lista de Situación
                    "listSituacion": [{
                        "clistSituacionNom": "Todo"
                    }, {
                        "clistSituacionNom": "Entregado"
                    }, {
                        "clistSituacionNom": "Facturado"
                    }, {
                        "clistSituacionNom": "Pendiente"
                    }],

                    // Lista de Estado
                    "listEstado": [{
                        "clistEstadoNom": "Todo"
                    }, {
                        "clistEstadoNom": "APROBADO"
                    }, {
                        "clistEstadoNom": "NO APROBADO"
                    }],

                    // DIALOG
                    "tipoFactura": [{
                        "codigo": "01",
                        "descripción": "FACTURA"
                    }, {
                        "codigo": "03",
                        "descripción": "BOLETA DE VENTA"
                    }, {
                        "codigo": "07",
                        "descripción": "NOTA DE CRÉDITO"
                    }, {
                        "codigo": "08",
                        "descripción": "NOTA DE DEBITO"
                    }, {
                        "codigo": "09",
                        "descripción": "GUÍA DE REMISIÓN REMITENTE"
                    }, {
                        "codigo": "12",
                        "descripción": "TICKET DE MAQUINA REGISTRADORA"
                    }, {
                        "codigo": "13",
                        "descripción": "DOCUMENTO EMITIDO POR BANCOS, INSTITUCIONES FINANCIERAS, CREDITICIAS Y DE SEGUROS QUE SE ENCUENTREN BAJO EL CONTROL DE LA SUPERINTENDENCIA DE BANCA Y SEGUROS"
                    }, {
                        "codigo": "14",
                        "descripción": "RECIBO POR SERVICIOS PUBLICOS"
                    }, {
                        "codigo": "16",
                        "descripción": "BOLETO DE VIAJE EMITIDO POR LA EMPRESAS DE TRANSPORTE PÚBLICO INTERPROVINCIAL DE PASAJEROS"
                    }, {
                        "codigo": "18",
                        "descripción": "DOCUMENTOS EMITIDOS POR LA AFP"
                    }, {
                        "codigo": "20",
                        "descripción": "COMPROBANTE DE RETENCION"
                    }, {
                        "codigo": "31",
                        "descripción": "GUIA DE REMISIÓN TRANSPORTISTA"
                    }, {
                        "codigo": "40",
                        "descripción": "COMPROBANTE DE PERCEPCIÓN"
                    }, {
                        "codigo": "41",
                        "descripción": "COMPROBANTE DE PERCEPCIÓN - VENTA INTERNA (FÍSICA-FORMATO IMPRESO)"
                    }, {
                        "codigo": "56",
                        "descripción": "COMPROBANTE DE PAGO SEAE"
                    }, {
                        "codigo": "71",
                        "descripción": "GUIA DE REMISIÓN REMITENTE COMPLEMENTARIA"
                    }, {
                        "codigo": "72",
                        "descripción": "GUIA DE REMISIÓN TRANSPORTISTA COMPLEMENTARIA"
                    }],
                    // Table de Mensajes de Errores
                    "listErrores": [{
                        "clistErroresTitulo": "Mensaje 1",
                        "clistErroresSubTitulo": "Error 1",
                        "clistErroresTipo": "Error"
                    }, {
                        "clistErroresTitulo": "Mensaje 2",
                        "clistErroresSubTitulo": "Error 2",
                        "clistErroresTipo": "Error"
                    }, {
                        "clistErroresTitulo": "Mensaje 3",
                        "clistErroresSubTitulo": "Error 3",
                        "clistErroresTipo": "Error"
                    }, {
                        "clistErroresTitulo": "Mensaje 4",
                        "clistErroresSubTitulo": "Error 4",
                        "clistErroresTipo": "Error"
                    }, {
                        "clistErroresTitulo": "Mensaje 5",
                        "clistErroresSubTitulo": "Error 5",
                        "clistErroresTipo": "Error"
                    }, {
                        "clistErroresTitulo": "Mensaje 6",
                        "clistErroresSubTitulo": "Error 6",
                        "clistErroresTipo": "Error"
                    }, {
                        "clistErroresTitulo": "Mensaje 7",
                        "clistErroresSubTitulo": "Error 7",
                        "clistErroresTipo": "Error"
                    }],

                    "listTablaDocumentos": [
                        /*{
                                            "clistTabDocuTipo": "FA",
                                            "clistTabDocuRUC": "20450800017",
                                            "clistTabDocuSerie": "F001",
                                            "clistTabDocuNumero": "00002345",
                                            "clistTabDocuTamano": "36",
                                            "clistTabDocuExension": "pdf"
                                        }, {
                                            "clistTabDocuTipo": "MI",
                                            "clistTabDocuRUC": "20450800017",
                                            "clistTabDocuSerie": "F001",
                                            "clistTabDocuNumero": "00002345",
                                            "clistTabDocuTamano": "25",
                                            "clistTabDocuExension": "pdf"
                                        }*/
                    ],

                    "listTablaDocumentosTemp": [],

                    "listTipoComprobante": [{
                        "clistTipoComprobanteValue": "01"
                    }, {
                        "clistTipoComprobanteValue": "08"
                    }, {
                        "clistTipoComprobanteValue": "GR"
                    }, {
                        "clistTipoComprobanteValue": "AD"
                    }, {
                        "clistTipoComprobanteValue": "OT"
                    }, {
                        "clistTipoComprobanteValue": "LQ"
                    }, {
                        "clistTipoComprobanteValue": "ST"
                    }, {
                        "clistTipoComprobanteValue": "AP"
                    }, {
                        "clistTipoComprobanteValue": "07"
                    }],
                    "listItemFacturaPosicionxeliminar": [],
                    "listItemFacturasxeliminar": [],
                    "listTotalValesIngreso": [],
                    "listFaltanteValesIngreso": [],
                    "listSeleccionValesIngreso": []
                };

                var oModel = new sap.ui.model.json.JSONModel(oData);
                this.setModel(oModel, "myParam");
            }
        });
    }
);