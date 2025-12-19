sap.ui.define([
    'sap/m/library',
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    'sap/ui/export/Spreadsheet'
], function (mobileLibrary,Controller, Fragment, Spreadsheet) { //MM-AJUSTES-20240923
    "use strict";
    var URLHelper = mobileLibrary.URLHelper;
    return Controller.extend("nsrdos.uiportalprov_qas.controller.Vista_Menu_Principal", {

        varTableURL: "",
        varTableDocument: "",
        varTableT_CEN: "",
        varTableT_CON: "",
        varTableT_CON_DET: "",
        varTableT_CRONOGRAMA: "",
        varTableT_CTR_DET: "",
        varTableT_DOC: "",
        varTableT_EMP: "",
        varTableT_FAC: "",
        varTableT_FAC_DET: "",
        varTableT_FAC_POS: "",
        varTableT_OC: "",
        varTableT_OC_DET: "",
        varTableT_TIP_CAR: "",
        varTableT_USER: "",
        varTableT_USUARIO_EMP: "",
        varTableT_USUARIO_PRO: "",
        varTableT_USUARIO_LOGIN: "",
        token: "",
        varGlobalContadorIniS: 0,
        varGlobalContadorIniE: 0,
        onInit: function () {

            this.getView().addStyleClass("sapUiSizeCompact");
            //this.getRouter().getRoute("Vista_Menu_Principal").attachMatched(this._onRouteMatched, this);

            // Llamar modelo
            var oThis = this;
            var oModel = oThis.getView().getModel("myParam");
        },

        onPressExcel: function () {

            var oThis = this;
            var oModel9 = oThis.getView().getModel("myParam");
            this.oGlobalStop10 = "S";
            this.oGlobalIteracion0 = "0";
            oModel9.setProperty("/oListaVectorCabeceraDetalle", []);
            this.oEntrar = "N";
            while (this.oGlobalStop10 === "S") {
                $.ajax({
                    type: "GET",
                    async: false,
                    url: "/odataent/odata4.svc/mydb/T_OC_DET?$format=json&$skiptoken=" + this.oGlobalIteracion0,
                    success: function (response) {

                        var oDataHana = response.value;

                        console.log(oDataHana.length);
                        if (oDataHana.length !== 0) {

                            var oMatriz = oModel9.getProperty("/oListaVectorCabeceraDetalle");
                            var oVector = {};
                            if (oDataHana.length !== 0) {
                                for (var i = 0; i < oDataHana.length; i++) {
                                    oVector = {};
                                    oVector = oDataHana[i];
                                    oMatriz.push(oVector);
                                }
                                oModel9.setProperty("/oListaVectorCabeceraDetalle", oMatriz);
                            } else {
                                oModel9.setProperty("/oListaVectorCabeceraDetalle", []);
                            }
                            console.log(oModel9.getProperty("/oListaVectorCabeceraDetalle"));

                            var oParametro10 = parseInt(this.oGlobalIteracion0, 10);
                            oParametro10 = oParametro10 + 1000;
                            this.oGlobalIteracion0 = oParametro10.toString();
                            console.log(this.oGlobalIteracion0);
                            this.oGlobalStop10 = "S";
                        } else {
                            this.oGlobalStop10 = "N";
                            this.oEntrar = "S";
                        }

                        if (this.oEntrar === "S") {
                            var oVectorCabeceraDetalle = oModel9.getProperty("/oListaVectorCabeceraDetalle");
                            console.log(new sap.ui.model.json.JSONModel(oVectorCabeceraDetalle));
                            var oModelJSON = new sap.ui.model.json.JSONModel(oVectorCabeceraDetalle);
                            var lenghtV = oModelJSON.getData().length;

                            var vector = [];
                            var llave = {};

                            for (var i = 0; i < lenghtV; i++) {
                                llave = {};
                                llave = oModelJSON.getData()[i];
                                vector.push(llave);
                            }

                            oModel9.setProperty("/listReporteVale4", vector);

                            var oView = this.getView();
                            var oModel = oView.getModel("myParam");

                            var varT_FAC_REGISTRADAS = oModel.getProperty("/listReporteVale4");

                            oModel.setProperty("/tblResFacRegExcel4", varT_FAC_REGISTRADAS);
                            console.log(oModel.getProperty("/tblResFacRegExcel4"));

                            this.onExport();
                        }
                    }.bind(this),
                    error: function (oError) {
                        this.oGlobalStop10 = "N";
                    }.bind(this)
                });
            }
        },

        onExport: function () {
            var aCols, aProducts, oSettings, oSheet;

            aCols = this.createColumnConfig();
            aProducts = this.getView().getModel("myParam").getProperty('/tblResFacRegExcel4');

            oSettings = {
                workbook: {
                    columns: aCols
                },
                dataSource: aProducts,
                fileName: "RepIngresosDetalle.xlsx"
            };

            oSheet = new Spreadsheet(oSettings);
            oSheet.build()
                .then(function () {
                    this.getView().setBusy(false);
                    sap.m.MessageToast.show("Se realizó la exportación del reporte con éxito.");
                }.bind(this))
                .finally(function () {
                    this.getView().setBusy(false);
                    oSheet.destroy();
                }.bind(this));
        },

        createColumnConfig: function () {

            var aCols = [];

            aCols.push({ label: 'DE_HOJA_ENTRADA', property: 'DE_HOJA_ENTRADA', type: 'string' });
            aCols.push({ label: 'DE_NUMERO_ORDEN', property: 'DE_NUMERO_ORDEN', type: 'string' });
            aCols.push({ label: 'DE_POS_DOC_MATERIAL', property: 'DE_POS_DOC_MATERIAL', type: 'string' });
            aCols.push({ label: 'DE_DOC_MATERIAL', property: 'DE_DOC_MATERIAL', type: 'string' });
            aCols.push({ label: 'EM_RUC', property: 'EM_RUC', type: 'string' });
            aCols.push({ label: 'US_RUC', property: 'US_RUC', type: 'string' });
            aCols.push({ label: 'DE_POSICION', property: 'DE_POSICION', type: 'string' });
            aCols.push({ label: 'ALMACEN', property: 'ALMACEN', type: 'string' });
            aCols.push({ label: 'CENTROS', property: 'CENTROS', type: 'string' });
            aCols.push({ label: 'CENTROV', property: 'CENTROV', type: 'string' });
            aCols.push({ label: 'COMPRADORS', property: 'COMPRADORS', type: 'string' });
            aCols.push({ label: 'COMPRADORV', property: 'COMPRADORV', type: 'string' });
            aCols.push({ label: 'DE_ANO', property: 'DE_ANO', type: 'string' });
            aCols.push({ label: 'DE_CANTIDAD', property: 'DE_CANTIDAD', type: 'string' });
            aCols.push({ label: 'DE_CANTIDAD_A_FACTURAR', property: 'DE_CANTIDAD_A_FACTURAR', type: 'string' });
            aCols.push({ label: 'DE_COD_EMPRESA', property: 'DE_COD_EMPRESA', type: 'string' });
            aCols.push({ label: 'DE_CONDICION', property: 'DE_CONDICION', type: 'string' });
            aCols.push({ label: 'DE_DESCRIPCION', property: 'DE_DESCRIPCION', type: 'string' });
            aCols.push({ label: 'DE_DIRECCION', property: 'DE_DIRECCION', type: 'string' });
            aCols.push({ label: 'DE_ESTADO', property: 'DE_ESTADO', type: 'string' });
            aCols.push({ label: 'DE_FACTURA', property: 'DE_FACTURA', type: 'string' });
            aCols.push({ label: 'DE_FEC_ACEPTACION', property: 'DE_FEC_ACEPTACION', type: 'string' });
            aCols.push({ label: 'DE_FEC_CONTABILIZACION', property: 'DE_FEC_CONTABILIZACION', type: 'string' });
            aCols.push({ label: 'DE_FEC_REGISTRO', property: 'DE_FEC_REGISTRO', type: 'string' });
            aCols.push({ label: 'DE_FLAC', property: 'DE_FLAC', type: 'string' });
            aCols.push({ label: 'DE_GUIA_REMISION', property: 'DE_GUIA_REMISION', type: 'string' });
            aCols.push({ label: 'DE_IGV', property: 'DE_IGV', type: 'string' });
            aCols.push({ label: 'DE_LIBERADO', property: 'DE_LIBERADO', type: 'string' });
            aCols.push({ label: 'DE_MONEDA', property: 'DE_MONEDA', type: 'string' });
            aCols.push({ label: 'DE_NUM_ACEPTACION', property: 'DE_NUM_ACEPTACION', type: 'string' });
            aCols.push({ label: 'DE_NUM_ARTICULO', property: 'DE_NUM_ARTICULO', type: 'string' });
            aCols.push({ label: 'DE_NUM_DOC_SAP', property: 'DE_NUM_DOC_SAP', type: 'string' });
            aCols.push({ label: 'DE_NUM_FACTURA', property: 'DE_NUM_FACTURA', type: 'string' });
            aCols.push({ label: 'DE_NUM_MATERIAL', property: 'DE_NUM_MATERIAL', type: 'string' });
            aCols.push({ label: 'DE_NUM_SERVICIO', property: 'DE_NUM_SERVICIO', type: 'string' });
            aCols.push({ label: 'DE_PEDIDO', property: 'DE_PEDIDO', type: 'string' });
            aCols.push({ label: 'DE_PRECIO', property: 'DE_PRECIO', type: 'string' });
            aCols.push({ label: 'DE_SITUACION1', property: 'DE_SITUACION1', type: 'string' });
            aCols.push({ label: 'DE_SITUACION2', property: 'DE_SITUACION2', type: 'string' });
            aCols.push({ label: 'DE_SUBTOTAL', property: 'DE_SUBTOTAL', type: 'string' });
            aCols.push({ label: 'DE_TIPO', property: 'DE_TIPO', type: 'string' });
            aCols.push({ label: 'DE_TOTAL', property: 'DE_TOTAL', type: 'string' });
            aCols.push({ label: 'DE_UND_MEDIDA', property: 'DE_UND_MEDIDA', type: 'string' });
            aCols.push({ label: 'DOC_PROVEEDOR', property: 'DOC_PROVEEDOR', type: 'string' });
            aCols.push({ label: 'LOTE', property: 'LOTE', type: 'string' });
            aCols.push({ label: 'NON_CENTRO', property: 'NON_CENTRO', type: 'string' });
            aCols.push({ label: 'NOTA_RECEPCION', property: 'NOTA_RECEPCION', type: 'string' });
            aCols.push({ label: 'NROSOLICITU', property: 'NROSOLICITU', type: 'string' });
            aCols.push({ label: 'NRO_CONTRATO', property: 'NRO_CONTRATO', type: 'string' });
            aCols.push({ label: 'RECEPTOR', property: 'RECEPTOR', type: 'string' });
            aCols.push({ label: 'REFERENCIA', property: 'REFERENCIA', type: 'string' });
            aCols.push({ label: 'SOLICITUDS', property: 'SOLICITUDS', type: 'string' });
            aCols.push({ label: 'UBICACION', property: 'UBICACION', type: 'string' });
            aCols.push({ label: 'USUARIO', property: 'USUARIO', type: 'string' });

            return aCols;
        },

        //Begin I@MM-01/03/2022-Ticket-2022-581
        llenarTablas: function (tabla, json) {
            this.getView().setBusy(true);
            //var url = "/odatabnv/odata2.svc/";
            var url = "" + this.varTableURL + "/";
            var oModelOData = new sap.ui.model.odata.v2.ODataModel(url, true);
            var oModel = this.getView().getModel("myParam");
            /*oModelOData.read("/" + tabla + "?$format=json", {*/
            $.ajax({
                type: "GET",
                url: this.varTableURL + "/" + tabla + "?$format=json",
                success: function (response) {
                    console.log(response);
                    try {
                        var oModelJSON = new sap.ui.model.json.JSONModel(response.value);
                        var tamTabla = oModelJSON.getData().length;
                        var vector = [];
                        var llave = {};
                        for (var i = 0; i < tamTabla; i++) {
                            llave = {};
                            llave = oModelJSON.getData()[i];
                            llave.selectItem = false;
                            vector.push(llave);
                        }
                        oModel.setProperty("/" + json, vector);
                    } catch (err) {
                        if (tabla === "T_EMPRESA_EMP") {
                            oModel.setProperty("/empresaCombo", []);
                        }
                        oModel.setProperty("/" + json, []);
                    }
                    //this.getView().byId("idTableUser").getBinding("rows").refresh(true);
                    this.getView().setBusy(false);
                }.bind(this),
                error: function (oError) {
                    if (tabla === "T_EMPRESA_EMP") {
                        oModel.setProperty("/empresaCombo", []);
                    }
                    oModel.setProperty("/" + json, []);
                    //this.getView().byId("idTableUser").getBinding("rows").refresh(true);
                    this.getView().setBusy(false);
                    // Mensaje de Alerta de que termino el tiempo de sesión
                    var dialogMensajeSesion = new sap.m.Dialog({
                        draggable: true,
                        resizable: true,
                        contentWidth: "auto",
                        title: "Mensaje de alerta",
                        content: [
                            new sap.m.Label({
                                text: "No se pudo establecer conexión con la base de datos. Por favor, acceder nuevamente o contactarse con el área de TI.",
                                wrapping: true,
                                width: "100%"
                            })
                        ],
                        state: "Warning",
                        type: "Message",
                        endButton: new sap.m.Button({
                            press: function () {
                                //this.getRouter().navTo("Vista_Login");
                                this.getView().setBusy(true);
                                window.location.reload();
                                dialogMensajeSesion.close();
                                this.getView().setBusy(true);
                            }.bind(this),
                            text: "Aceptar"
                        }),
                        afterClose: function () {
                            dialogMensajeSesion.destroy();
                        },
                        verticalScrolling: false
                    });
                    dialogMensajeSesion.open();
                }.bind(this)
            });
        },

        funObtenerIndIndicador: function () {

            var oThis = this;
            var oModel = oThis.getView().getModel("myParam");

            var oRespuesta = "";
            var oMaterial = this.getView().byId("idMaterial").getValue();

            var oDataIndiAdmi = oModel.getProperty("/listMatDetraccion");

            for (var i = 0; i < oDataIndiAdmi.length; i++) {
                if (oDataIndiAdmi[i].DE_NUM_MATERIAL === oMaterial) {
                    oOcion1 = 1;
                    oRespuesta = oDataIndiAdmi[i].NUMTP;
                }
            }

            console.log(oRespuesta);
            return oRespuesta;
        },

        funObtenerIndPorcentage: function () {

            var oThis = this;
            var oModel = oThis.getView().getModel("myParam");

            var oRespuesta = "";
            var oMaterial = this.getView().byId("idMaterial").getValue();

            var oDataIndiComp = oModel.getProperty("/codigoDetr");
            var oDataIndiAdmi = oModel.getProperty("/listMatDetraccion");

            var oOcion1 = 0;
            var oIndicador = "";
            for (var i = 0; i < oDataIndiAdmi.length; i++) {
                if (oDataIndiAdmi[i].DE_NUM_MATERIAL === oMaterial) {
                    oOcion1 = 1;
                    oIndicador = oDataIndiAdmi[i].NUMTP;
                }
            }
            console.log(oIndicador);

            if (oOcion1 === 1) {
                for (var i = 0; i < oDataIndiComp.length; i++) {
                    if (oDataIndiComp[i].codigo === oIndicador) {
                        oRespuesta = oDataIndiComp[i].porcent;
                    }
                }
            } else {
                oRespuesta = "";
            }

            console.log("Respuesta: " + oRespuesta);
            return oRespuesta;
        },

        funObtenerIndMonto: function () {

            var oThis = this;
            var oModel = oThis.getView().getModel("myParam");

            var oRespuesta = "";
            var oMaterial = this.getView().byId("idMaterial").getValue();

            var oDataIndiComp = oModel.getProperty("/codigoDetr");
            var oDataIndiAdmi = oModel.getProperty("/listMatDetraccion");

            var oOcion1 = 0;
            var oIndicador = "";
            for (var i = 0; i < oDataIndiAdmi.length; i++) {
                if (oDataIndiAdmi[i].DE_NUM_MATERIAL === oMaterial) {
                    oOcion1 = 1;
                    oIndicador = oDataIndiAdmi[i].NUMTP;
                }
            }
            console.log(oIndicador);

            if (oOcion1 === 1) {
                for (var i = 0; i < oDataIndiComp.length; i++) {
                    if (oDataIndiComp[i].codigo === oIndicador) {
                        oRespuesta = oDataIndiComp[i].monto;
                    }
                }
            } else {
                oRespuesta = "";
            }

            console.log("Respuesta: " + oRespuesta);
            return oRespuesta;
        },
        //End I@MM-01/03/2022-Ticket-2022-581

        metObtenerUsuarioPrincipal: function () {

            var oView = this.getView();
            var oModel = oView.getModel("myParam");
            this.oWebServiceURl = oModel.getProperty("/listUrlWeservice/wsClientes");//I@GM-28/10/2021-Ticket-2021-CCC

            var token = {
                "csrfToken": ""
            };

            var oToken = new sap.ui.model.json.JSONModel(token);
            sap.ui.getCore().setModel(oToken, 'oToken');
            var tokenModel = sap.ui.getCore().getModel("oToken").getData();

            console.log("Token2", tokenModel);

            console.log(this.varTableURL);
            console.log(this.varTableT_USER);

            var oThis = this;
            var oModel9 = oThis.getView().getModel("myParam");
            this.oGlobalStop10 = "S";
            this.oGlobalIteracion0 = "0";
            oModel9.setProperty("/oListaVectorCabeceraDetalle", []);
            this.oEntrar = "N";
            while (this.oGlobalStop10 === "S") {
                $.ajax({
                    type: "GET",
                    async: false,
                    //url: "cpbl/browse/obtUser",
                    url: this.varTableURL + "/" + this.varTableT_USER + "?$skiptoken=" + this.oGlobalIteracion0 + "&$format=json",
                    headers: {
                        ContentType: 'application/json',
                        Accept: 'application/json',
                        cache: false,
                        'X-CSRF-Token': 'Fetch'
                    },
                    success: function (data, textStatus, request) {

                        var oDataHana = data.value;

                        console.log(oDataHana.length);
                        if (oDataHana.length !== 0) {

                            var oMatriz = oModel9.getProperty("/oListaVectorCabeceraDetalle");
                            var oVector = {};
                            if (oDataHana.length !== 0) {
                                for (var i = 0; i < oDataHana.length; i++) {
                                    oVector = {};
                                    oVector = oDataHana[i];
                                    oMatriz.push(oVector);
                                }
                                oModel9.setProperty("/oListaVectorCabeceraDetalle", oMatriz);
                            } else {
                                oModel9.setProperty("/oListaVectorCabeceraDetalle", []);
                            }
                            console.log(oModel9.getProperty("/oListaVectorCabeceraDetalle"));

                            var oParametro10 = parseInt(this.oGlobalIteracion0, 10);
                            oParametro10 = oParametro10 + 1000;
                            this.oGlobalIteracion0 = oParametro10.toString();
                            console.log(this.oGlobalIteracion0);
                            this.oGlobalStop10 = "S";
                        } else {
                            this.oGlobalStop10 = "N";
                            this.oEntrar = "S";
                        }

                        if (this.oEntrar === "S") {
                            var oVectorCabeceraDetalle = oModel9.getProperty("/oListaVectorCabeceraDetalle");
                            console.log(data);
                            console.log(textStatus);
                            console.log(request);
                            oModel.setProperty("/listTblOdataUsuarioPrincipal", oVectorCabeceraDetalle);

                            console.log(oModel.getProperty("/listTblOdataUsuarioPrincipal"));
                            var oListTblOdataUsuarioPrincipal = oModel.getProperty("/listTblOdataUsuarioPrincipal/0/Resp/id");
                            console.log(oListTblOdataUsuarioPrincipal);
                            this.oGlobalCodUsusarioPrincipal = oListTblOdataUsuarioPrincipal;
                            oModel.setProperty("/varUsuarioPrincipalPalicativo", this.oGlobalCodUsusarioPrincipal);
                            // this.getView().byId("idUserPrincipal").setText(oListTblOdataUsuarioPrincipal);//D@OH-18/10/2021-
                            //this.crearModeloPerfilUsuario(this.oGlobalCodUsusarioPrincipal);//I@GM-28/10/2021-Ticket-2021-CCC
                            //this.onUsuarioSelect2(oListTblOdataUsuarioPrincipal);//D@GM-28/10/2021-Ticket-2021-CCC




                            //this.funOdataTablaImportarSelectClente();
                            tokenModel["csrfToken"] = request.getResponseHeader('X-CSRF-Token');
                            this.token = tokenModel["csrfToken"];

                            oModel.setProperty("/varUsuarioPrincipalTokken", tokenModel["csrfToken"]);
                            console.log(oModel.getProperty("/varUsuarioPrincipalTokken"));
                            console.log(this.token);
                            //this.metObtenerWebservice(); // I@OH
                        }

                    }.bind(this),
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log("Status: " + textStatus);
                        console.log("Error: " + errorThrown);
                        console.log("LLENA USUARIO GLOBAL");
                        window.location.replace('./logout.html');
                        //INI SOLO DEBUG
                        // this.oGlobalCodUsusarioPrincipal = "oherrera@rivercon.com";
                        // this.getView().byId("idUserPrincipal").setText("oherrera@rivercon.com");
                        // this.onUsuarioSelect2("oherrera@rivercon.com");
                        // oModel.setProperty("/varUsuarioPrincipalPalicativo", this.oGlobalCodUsusarioPrincipal);
                        // this.funOdataTablaImportarSelectClente();
                        //FIN

                    }.bind(this)
                });
            }
        },

        LogOffPress: function () {

            window.location.replace('./logout');
            
            //sap.m.URLHelper.redirect("logout.html", false);
            //this.getRouter().navTo("Vista_Login");
        },

        _onRouteMatched: function () {

            var today = new Date();
            var dd = today.getDate();
            var MM = today.getMonth() + 1;
            var yyyy = today.getFullYear();

            this.getView().byId("productInput").setVisible(false);
            this.getView().byId("idListaProveedores").setVisible(false); //MM-AJUSTES-20240923

            this.byId("idFecha1").setFooter(yyyy + "/" + MM + "/" + dd);
            this.byId("idFecha2").setFooter(yyyy + "/" + MM + "/" + dd);

            var oView = this.getView();
            var oModel = oView.getModel("myParam");
            oView.setModel(oModel);
            this.getItemVisibles();

            this.getView().byId("idItem1").setVisible(false);
            this.getView().byId("idItem2").setVisible(false);
            this.getView().byId("idItem3").setVisible(false);
            this.getView().byId("idItem4").setVisible(false);
            this.getView().byId("idItem5").setVisible(false);
            this.getView().byId("idItem6").setVisible(false);
            this.getView().byId("idItem7").setVisible(false);
            this.getView().byId("idItem8").setVisible(false);
            this.getView().byId("idItem9").setVisible(false);

            // Tablas
            this.varTableURL = oModel.getProperty("/listTablasOData/clistTablasODataURL");
            this.varTableDocument = oModel.getProperty("/listTablasOData/clistTablasODataDocument");
            this.varTableT_CEN = oModel.getProperty("/listTablasOData/clistTablasODataT_CEN");
            this.varTableT_CON = oModel.getProperty("/listTablasOData/clistTablasODataT_CON");
            this.varTableT_CON_DET = oModel.getProperty("/listTablasOData/clistTablasODataT_CON_DET");
            this.varTableT_CRONOGRAMA = oModel.getProperty("/listTablasOData/clistTablasODataT_CRONOGRAMA");
            this.varTableT_CTR_DET = oModel.getProperty("/listTablasOData/clistTablasODataT_CTR_DET");
            this.varTableT_DOC = oModel.getProperty("/listTablasOData/clistTablasODataT_DOC");
            this.varTableT_EMP = oModel.getProperty("/listTablasOData/clistTablasODataT_EMP");
            this.varTableT_FAC = oModel.getProperty("/listTablasOData/clistTablasODataT_FAC");
            this.varTableT_FAC_DET = oModel.getProperty("/listTablasOData/clistTablasODataT_FAC_DET");
            this.varTableT_FAC_POS = oModel.getProperty("/listTablasOData/clistTablasODataT_FAC_POS");
            this.varTableT_OC = oModel.getProperty("/listTablasOData/clistTablasODataT_OC");
            this.varTableT_OC_DET = oModel.getProperty("/listTablasOData/clistTablasODataT_OC_DET");
            this.varTableT_TIP_CAR = oModel.getProperty("/listTablasOData/clistTablasODataT_TIP_CAR");
            this.varTableT_USER = oModel.getProperty("/listTablasOData/clistTablasODataT_USER");
            this.varTableT_USUARIO_EMP = oModel.getProperty("/listTablasOData/clistTablasODataT_USUARIO_EMP");
            this.varTableT_USUARIO_PRO = oModel.getProperty("/listTablasOData/clistTablasODataT_USUARIO_PRO");
            this.varTableT_USUARIO_LOGIN = oModel.getProperty("/listTablasOData/clistTablasODataT_USUARIO_LOGIN");

            // Ubicar el proveedor correcto solo validos para usuarios ESTAN
            console.log(oModel.getProperty("/listOpcUsuario/cOpcUsuario"));
            if (oModel.getProperty("/listOpcUsuario/cOpcUsuario") === "0") {
                try {
                    var varTamCodigoRucProv = oModel.getProperty("/listaProveedoresRUC");
                    var varTamCodigoRucProvLogin = oModel.getProperty("/usuarioLogin");
                    var varTamCodigoRucProvLoginAlter = oModel.getProperty("/usuarioLoginAlternativo");

                    var varopcValidarExisteRUC = "N";
                    for (var z = 0; z < varTamCodigoRucProv.length; z++) {
                        var varCodiProveedor = oModel.getProperty("/listaProveedoresRUC/" + z + "/codigo");
                        var varAdminiProveedor = oModel.getProperty("/listaProveedoresRUC/" + z + "/descripcion");
                        var varAdminiTipo = oModel.getProperty("/listaProveedoresRUC/" + z + "/tipo");
                        if (varTamCodigoRucProvLoginAlter === varCodiProveedor && varAdminiTipo === "ADMIN") {
                            varopcValidarExisteRUC = "S";
                        } else if (varTamCodigoRucProvLoginAlter === varCodiProveedor && varAdminiTipo === "AVANZ") {
                            varopcValidarExisteRUC = "S";
                        }
                    }
                    if (varopcValidarExisteRUC === "S") {

                        for (var k = 0; k < varTamCodigoRucProv.length; k++) {
                            if (parseInt(oModel.getProperty("/listaProveedoresRUC/" + k + "/codigo"), 10) === parseInt(varTamCodigoRucProvLogin, 10)) {
                                var comboDetra = this.getView().byId("idRUCProveedor");
                                comboDetra.getBinding("items").refresh(true);
                                var firstItem = comboDetra.getItems()[k];
                                comboDetra.setSelectedItem(firstItem, true);
                                var valor1 = oModel.getProperty("/listaProveedoresRUC/" + k + "/descripcion");
                                var valor2 = oModel.getProperty("/listaProveedoresRUC/" + k + "/codigo");
                                oModel.setProperty("/usuarioLoginDescripcionRuc", valor1);
                                var productInput = this.getView().byId("productInput");
                                productInput.setValue(valor2 + " - " + valor1);
                            }
                        }

                        this.getView().byId("idRUCProveedor").setEditable(false);
                        this.getView().byId("idRUCProveedor").setVisible(false);
                        this.getView().byId("productInput").setVisible(true);
                        this.getView().byId("idListaProveedores").setVisible(true); //MM-AJUSTES-20240923
                        this.getView().byId("idRUCProveedorNoAdmin1").setVisible(false);
                        this.getView().byId("idRUCProveedorNoAdmin2").setVisible(false);
                    } else {
                        this.getView().byId("idRUCProveedor").setEditable(false);
                        this.getView().byId("idRUCProveedor").setVisible(false);
                        this.getView().byId("productInput").setVisible(false);
                        this.getView().byId("idListaProveedores").setVisible(false); //MM-AJUSTES-20240923
                        this.getView().byId("idRUCProveedorNoAdmin1").setVisible(true);
                        this.getView().byId("idRUCProveedorNoAdmin2").setVisible(true);
                    }
                } catch (error) {
                }
            }
        },
        showmessagepopover: function () {
            var dialog = new sap.m.Dialog({
                icon: "sap-icon://expense-report",
                title: "Noticia",
                type: "Message",
                state: "Information",
                content: [
                    new sap.m.HBox({
                        width: "100%",
                        justifyContent: "Center",
                        items: [
                            new sap.m.Image({
                                src: "../img/avisologo4.jpg",
                                width: "55%",
                                press: function () {
                                    // Archivos a descargar
/*                                     var files = [
                                        "../pdfs/Resumen_Reporte_de_Sostenibilidad_2024.pdf",
                                        "../pdfs/VF_Reporte_de_Sostenibilidad_Redondos.pdf"
                                    ]; */

                                    // Archivos a descargar
                                    var url="https://docs.google.com/forms/d/e/1FAIpQLScS6WRjqM3fM3YlG6LA7j-SsVLHcO8MWUd02qFkt_iCHgd6Jw/viewform"
                                    URLHelper.redirect(url, true);
                                    //sap.m.URLHelper.redirect(url, false)
                                    //sap.m.URLHelper.redirect(url, true);
/*                                     files.forEach(function (file) {
                                        var link = document.createElement("a");
                                        link.href = file;
                                        link.download = file.split("/").pop();
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }); */
                                }
                            })
                        ]
                    }).addStyleClass("cssCentrarImagen")
                ],
                beginButton: new sap.m.Button({
                    text: "Cerrar",
                    icon: "sap-icon://decline",
                    press: function () {
                        dialog.close();
                    }
                }),
                afterClose: function () {
                    dialog.destroy();
                }
            });

            dialog.open();
        },
        funInsertarRegistro1: function () {

            var llave = {};
            /*llave.AUTORIZACION = "ESTAN";
            llave.EMAIL = "customer.support@ingredion.com";
            llave.ESTADO = "a";
            llave.ESTADOG = "O";
            llave.LIFNR = "0010010757";
            llave.MONTO_MAXIMO = "";
            llave.NOM_USUARIO = "INGREDION PERU SA";
            llave.SEC_1 = "x";
            llave.SEC_2 = "x";
            llave.SEC_3 = "";
            llave.SEC_4 = "";
            llave.SEC_5 = "";
            llave.SEC_6 = "x";
            llave.SEC_7 = "x";
            llave.SEC_8 = "";
            llave.TIPO_CARGA = "";
            llave.TOLERANCIA = "not";
            llave.US_CONTRASENA = "s86798129812g";
            llave.US_CONTRASENA2 = "";
            llave.US_USUARIO = "20100068649";*/

            var oVectorJSON = [{
                "ALMACEN": "",
                "CENTROS": "",
                "CENTROV": "",
                "COMPRADORS": "",
                "COMPRADORV": "",
                "DE_ANO": "2022",
                "DE_CANTIDAD": " 1.000",
                "DE_CANTIDAD_A_FACTURAR": "",
                "DE_COD_EMPRESA": "",
                "DE_CONDICION": "",
                "DE_DESCRIPCION": "MANT./REPAR. MAQUINARIA (PROPIO)",
                "DE_DIRECCION": "",
                "DE_DOC_MATERIAL": "",
                "DE_ESTADO": "APROBADO",
                "DE_FACTURA": "",
                "DE_FEC_ACEPTACION": "2022-05-06",
                "DE_FEC_CONTABILIZACION": "2022-05-06",
                "DE_FEC_REGISTRO": "2022-05-06",
                "DE_FLAC": "",
                "DE_GUIA_REMISION": "",
                "DE_HOJA_ENTRADA": "1000065720",
                "DE_IGV": "",
                "DE_LIBERADO": "",
                "DE_MONEDA": "PEN",
                "DE_NUMERO_ORDEN": "4200048147",
                "DE_NUM_ACEPTACION": "",
                "DE_NUM_ARTICULO": "",
                "DE_NUM_DOC_SAP": "",
                "DE_NUM_FACTURA": "",
                "DE_NUM_MATERIAL": "",
                "DE_NUM_SERVICIO": "000000000001000082",
                "DE_PEDIDO": "",
                "DE_POSICION": "10",
                "DE_POS_DOC_MATERIAL": "0001",
                "DE_PRECIO": "30",
                "DE_SITUACION1": "Entregado",
                "DE_SITUACION2": "",
                "DE_SUBTOTAL": "",
                "DE_TIPO": "H",
                "DE_TOTAL": "200.00",
                "DE_UND_MEDIDA": "UN",
                "DOC_PROVEEDOR": "",
                "EM_RUC": "20221084684",
                "LOTE": "",
                "NON_CENTRO": "",
                "NOTA_RECEPCION": "",
                "NROSOLICITU": "",
                "NRO_CONTRATO": "",
                "RECEPTOR": "",
                "REFERENCIA": "",
                "SOLICITUDS": "",
                "UBICACION": "",
                "USUARIO": "",
                "US_RUC": "20601842158"
            }]

            for (var i = 0; i < oVectorJSON.length; i++) {
                llave = {};
                llave.ALMACEN = oVectorJSON[i].ALMACEN;
                llave.CENTROS = oVectorJSON[i].CENTROS;
                llave.CENTROV = oVectorJSON[i].CENTROV;
                llave.COMPRADORS = oVectorJSON[i].COMPRADORS;
                llave.COMPRADORV = oVectorJSON[i].COMPRADORV;
                llave.DE_ANO = oVectorJSON[i].DE_ANO;
                llave.DE_CANTIDAD = oVectorJSON[i].DE_CANTIDAD;
                llave.DE_CANTIDAD_A_FACTURAR = oVectorJSON[i].DE_CANTIDAD_A_FACTURAR;
                llave.DE_COD_EMPRESA = oVectorJSON[i].DE_COD_EMPRESA;
                llave.DE_CONDICION = oVectorJSON[i].DE_CONDICION;
                llave.DE_DESCRIPCION = oVectorJSON[i].DE_DESCRIPCION;
                llave.DE_DIRECCION = oVectorJSON[i].DE_DIRECCION;
                llave.DE_DOC_MATERIAL = oVectorJSON[i].DE_DOC_MATERIAL;
                llave.DE_ESTADO = oVectorJSON[i].DE_ESTADO;
                llave.DE_FACTURA = oVectorJSON[i].DE_FACTURA;
                llave.DE_FEC_ACEPTACION = oVectorJSON[i].DE_FEC_ACEPTACION;
                llave.DE_FEC_CONTABILIZACION = oVectorJSON[i].DE_FEC_CONTABILIZACION;
                llave.DE_FEC_REGISTRO = oVectorJSON[i].DE_FEC_REGISTRO;
                llave.DE_FLAC = oVectorJSON[i].DE_FLAC;
                llave.DE_GUIA_REMISION = oVectorJSON[i].DE_GUIA_REMISION;
                llave.DE_HOJA_ENTRADA = oVectorJSON[i].DE_HOJA_ENTRADA;
                llave.DE_IGV = oVectorJSON[i].DE_IGV;
                llave.DE_LIBERADO = oVectorJSON[i].DE_LIBERADO;
                llave.DE_MONEDA = oVectorJSON[i].DE_MONEDA;
                llave.DE_NUMERO_ORDEN = oVectorJSON[i].DE_NUMERO_ORDEN;
                llave.DE_NUM_ACEPTACION = oVectorJSON[i].DE_NUM_ACEPTACION;
                llave.DE_NUM_ARTICULO = oVectorJSON[i].DE_NUM_ARTICULO;
                llave.DE_NUM_DOC_SAP = oVectorJSON[i].DE_NUM_DOC_SAP;
                llave.DE_NUM_FACTURA = oVectorJSON[i].DE_NUM_FACTURA;
                llave.DE_NUM_MATERIAL = oVectorJSON[i].DE_NUM_MATERIAL;
                llave.DE_NUM_SERVICIO = oVectorJSON[i].DE_NUM_SERVICIO;
                llave.DE_PEDIDO = oVectorJSON[i].DE_PEDIDO;
                llave.DE_POSICION = oVectorJSON[i].DE_POSICION;
                llave.DE_POS_DOC_MATERIAL = oVectorJSON[i].DE_POS_DOC_MATERIAL;
                llave.DE_PRECIO = oVectorJSON[i].DE_PRECIO;
                llave.DE_SITUACION1 = oVectorJSON[i].DE_SITUACION1;
                llave.DE_SITUACION2 = oVectorJSON[i].DE_SITUACION2;
                llave.DE_SUBTOTAL = oVectorJSON[i].DE_SUBTOTAL;
                llave.DE_TIPO = oVectorJSON[i].DE_TIPO;
                llave.DE_TOTAL = oVectorJSON[i].DE_TOTAL;
                llave.DE_UND_MEDIDA = oVectorJSON[i].DE_UND_MEDIDA;
                llave.DOC_PROVEEDOR = oVectorJSON[i].DOC_PROVEEDOR;
                llave.EM_RUC = oVectorJSON[i].EM_RUC;
                llave.LOTE = oVectorJSON[i].LOTE;
                llave.NON_CENTRO = oVectorJSON[i].NON_CENTRO;
                llave.NOTA_RECEPCION = oVectorJSON[i].NOTA_RECEPCION;
                llave.NROSOLICITU = oVectorJSON[i].NROSOLICITU;
                llave.NRO_CONTRATO = oVectorJSON[i].NRO_CONTRATO;
                llave.RECEPTOR = oVectorJSON[i].RECEPTOR;
                llave.REFERENCIA = oVectorJSON[i].REFERENCIA;
                llave.SOLICITUDS = oVectorJSON[i].SOLICITUDS;
                llave.UBICACION = oVectorJSON[i].UBICACION;
                llave.USUARIO = oVectorJSON[i].USUARIO;
                llave.US_RUC = oVectorJSON[i].US_RUC;
                console.log(llave);

                var url = "" + this.varTableURL + "/";
                var oModel = new sap.ui.model.odata.v2.ODataModel(url, true);

                var oVectorJSON2 = JSON.stringify(llave);
                var oHeaders = { 'X-CSRF-Token': this.token };
                $.ajax(this.varTableURL + "/" + this.varTableT_OC_DET, {
                    headers: oHeaders,
                    data: oVectorJSON2,
                    type: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        console.log("OK");
                    }.bind(this),
                    error: function (data) {
                        console.log("ERROR");
                    }.bind(this)
                });
            }
        },

        funInsertarRegistro2: function () {

            var oVector = [{
                "AUTORIZACION": "ESTAN",
                "EMAIL": "ventas1@ertiza.com",
                "ESTADO": "a",
                "ESTADOG": "O",
                "LIFNR": "99999164",
                "MONTO_MAXIMO": "",
                "NOM_USUARIO": "USUARIO1",
                "SEC_1": "x",
                "SEC_2": "x",
                "SEC_3": "",
                "SEC_4": "",
                "SEC_5": "",
                "SEC_6": "x",
                "SEC_7": "x",
                "SEC_8": "",
                "TIPO_CARGA": "",
                "TOLERANCIA": "not",
                "US_CONTRASENA": "bba970ed264e55dc313cad301aa0e",
                "US_CONTRASENA2": "lwSefixDJ246",
                "US_USUARIO": "12345678911"
            }, {
                "AUTORIZACION": "ESTAN",
                "EMAIL": "ventas2@ertiza.com",
                "ESTADO": "a",
                "ESTADOG": "O",
                "LIFNR": "99999165",
                "MONTO_MAXIMO": "",
                "NOM_USUARIO": "USUARIO2",
                "SEC_1": "x",
                "SEC_2": "x",
                "SEC_3": "",
                "SEC_4": "",
                "SEC_5": "",
                "SEC_6": "x",
                "SEC_7": "x",
                "SEC_8": "",
                "TIPO_CARGA": "",
                "TOLERANCIA": "not",
                "US_CONTRASENA": "bba970ed264e55dc313cad301aa0e",
                "US_CONTRASENA2": "lwSefixDJ246",
                "US_USUARIO": "12345678912"
            }, {
                "AUTORIZACION": "ESTAN",
                "EMAIL": "ventas3@ertiza.com",
                "ESTADO": "a",
                "ESTADOG": "O",
                "LIFNR": "99999166",
                "MONTO_MAXIMO": "",
                "NOM_USUARIO": "USUARIO3",
                "SEC_1": "x",
                "SEC_2": "x",
                "SEC_3": "",
                "SEC_4": "",
                "SEC_5": "",
                "SEC_6": "x",
                "SEC_7": "x",
                "SEC_8": "",
                "TIPO_CARGA": "",
                "TOLERANCIA": "not",
                "US_CONTRASENA": "bba970ed264e55dc313cad301aa0e",
                "US_CONTRASENA2": "lwSefixDJ246",
                "US_USUARIO": "12345678913"
            }]

            var llave = {};
            llave.AUTORIZACION = "ESTAN";
            llave.EMAIL = "ventas@ertiza.com";
            llave.ESTADO = "a";
            llave.ESTADOG = "O";
            llave.LIFNR = "90000164";
            llave.MONTO_MAXIMO = "";
            llave.NOM_USUARIO = "ERTIZA SISTEMAS DE PESAJE";
            llave.SEC_1 = "x";
            llave.SEC_2 = "x";
            llave.SEC_3 = "";
            llave.SEC_4 = "";
            llave.SEC_5 = "";
            llave.SEC_6 = "x";
            llave.SEC_7 = "x";
            llave.SEC_8 = "";
            llave.TIPO_CARGA = "";
            llave.TOLERANCIA = "not";
            llave.US_CONTRASENA = "bba970ed264e55dc313cad301aa0e";
            llave.US_CONTRASENA2 = "lwSefixDJ246";
            llave.US_USUARIO = "20601842158";

            var oVectorJSON = JSON.stringify({ oVector });
            console.log(oVectorJSON);
            var oHeaders = { 'X-CSRF-Token': this.token };
            console.log(oHeaders);
            console.log(this.varTableURL + "/" + this.varTableT_USER);
            $.ajax(this.varTableURL + "/" + this.varTableT_USER, {
                headers: oHeaders,
                data: oVectorJSON,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                //traditional: true,
                //processData: false,
                success: function (data) {
                    console.log("OK");
                }.bind(this),
                error: function (data) {
                    console.log("ERROR");
                }.bind(this)
            });
        },

        funInsertarRegistro3: function () {

            var llave = {};
            /*llave.AUTORIZACION = "ESTAN";
            llave.EMAIL = "customer.support@ingredion.com";
            llave.ESTADO = "a";
            llave.ESTADOG = "O";
            llave.LIFNR = "0010010757";
            llave.MONTO_MAXIMO = "";
            llave.NOM_USUARIO = "INGREDION PERU SA";
            llave.SEC_1 = "x";
            llave.SEC_2 = "x";
            llave.SEC_3 = "";
            llave.SEC_4 = "";
            llave.SEC_5 = "";
            llave.SEC_6 = "x";
            llave.SEC_7 = "x";
            llave.SEC_8 = "";
            llave.TIPO_CARGA = "";
            llave.TOLERANCIA = "not";
            llave.US_CONTRASENA = "s86798129812g";
            llave.US_CONTRASENA2 = "";
            llave.US_USUARIO = "20100068649";*/

            llave.ALMACEN = "";
            llave.CENTROS = "";
            llave.CENTROV = "";
            llave.COMPRADORS = "";
            llave.COMPRADORV = "";
            llave.DE_ANO = "2022";
            llave.DE_CANTIDAD = " 1.000";
            llave.DE_CANTIDAD_A_FACTURAR = "";
            llave.DE_COD_EMPRESA = "";
            llave.DE_CONDICION = "";
            llave.DE_DESCRIPCION = "FLETE AVES VIVAS";
            llave.DE_DIRECCION = "";
            llave.DE_DOC_MATERIAL = "";
            llave.DE_ESTADO = "APROBADO";
            llave.DE_FACTURA = "";
            llave.DE_FEC_ACEPTACION = "2022-03-04";
            llave.DE_FEC_CONTABILIZACION = "2022-03-04";
            llave.DE_FEC_REGISTRO = "2022-03-04";
            llave.DE_FLAC = "";
            llave.DE_GUIA_REMISION = "";
            llave.DE_HOJA_ENTRADA = "1000059910";
            llave.DE_IGV = "";
            llave.DE_LIBERADO = "";
            llave.DE_MONEDA = "PEN";
            llave.DE_NUMERO_ORDEN = "4200043307";
            llave.DE_NUM_ACEPTACION = "";
            llave.DE_NUM_ARTICULO = "";
            llave.DE_NUM_DOC_SAP = "";
            llave.DE_NUM_FACTURA = "";
            llave.DE_NUM_MATERIAL = "";
            llave.DE_NUM_SERVICIO = "000000000001000052";
            llave.DE_PEDIDO = "";
            llave.DE_POSICION = "40";
            llave.DE_POS_DOC_MATERIAL = "0001";
            llave.DE_PRECIO = "30";
            llave.DE_SITUACION1 = "Entregado";
            llave.DE_SITUACION2 = "";
            llave.DE_SUBTOTAL = "";
            llave.DE_TIPO = "H";
            llave.DE_TOTAL = "2,376.00";
            llave.DE_UND_MEDIDA = "UN";
            llave.DOC_PROVEEDOR = "";
            llave.EM_RUC = "20221084684";
            llave.LOTE = "";
            llave.NON_CENTRO = "";
            llave.NOTA_RECEPCION = "";
            llave.NROSOLICITU = "";
            llave.NRO_CONTRATO = "";
            llave.RECEPTOR = "";
            llave.REFERENCIA = "";
            llave.SOLICITUDS = "";
            llave.UBICACION = "";
            llave.USUARIO = "";
            llave.US_RUC = "10157305102";

            var url = "" + this.varTableURL + "/";
            var oModel = new sap.ui.model.odata.v2.ODataModel(url, true);

            var oVectorJSON = JSON.stringify(llave);
            var oHeaders = { 'X-CSRF-Token': this.token };
            $.ajax(this.varTableURL + "/" + this.varTableT_OC_DET, {
                headers: oHeaders,
                data: oVectorJSON,
                type: "POST",
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    console.log("OK");
                }.bind(this),
                error: function (data) {
                    console.log("ERROR");
                }.bind(this)
            });
        },

        funInsertarRegistro4: function () {

            var llave = {};
            /*llave.AUTORIZACION = "ESTAN";
            llave.EMAIL = "customer.support@ingredion.com";
            llave.ESTADO = "a";
            llave.ESTADOG = "O";
            llave.LIFNR = "0010010757";
            llave.MONTO_MAXIMO = "";
            llave.NOM_USUARIO = "INGREDION PERU SA";
            llave.SEC_1 = "x";
            llave.SEC_2 = "x";
            llave.SEC_3 = "";
            llave.SEC_4 = "";
            llave.SEC_5 = "";
            llave.SEC_6 = "x";
            llave.SEC_7 = "x";
            llave.SEC_8 = "";
            llave.TIPO_CARGA = "";
            llave.TOLERANCIA = "not";
            llave.US_CONTRASENA = "s86798129812g";
            llave.US_CONTRASENA2 = "";
            llave.US_USUARIO = "20100068649";*/

            llave.ALMACEN = "";
            llave.CENTROS = "";
            llave.CENTROV = "";
            llave.COMPRADORS = "";
            llave.COMPRADORV = "";
            llave.DE_ANO = "2022";
            llave.DE_CANTIDAD = " 1.000";
            llave.DE_CANTIDAD_A_FACTURAR = "";
            llave.DE_COD_EMPRESA = "";
            llave.DE_CONDICION = "";
            llave.DE_DESCRIPCION = "APOYO EN PROCESOS PRODUCTIVOS";
            llave.DE_DIRECCION = "";
            llave.DE_DOC_MATERIAL = "";
            llave.DE_ESTADO = "APROBADO";
            llave.DE_FACTURA = "";
            llave.DE_FEC_ACEPTACION = "2022-03-04";
            llave.DE_FEC_CONTABILIZACION = "2022-03-04";
            llave.DE_FEC_REGISTRO = "2022-03-04";
            llave.DE_FLAC = "";
            llave.DE_GUIA_REMISION = "";
            llave.DE_HOJA_ENTRADA = "1000059914";
            llave.DE_IGV = "";
            llave.DE_LIBERADO = "";
            llave.DE_MONEDA = "PEN";
            llave.DE_NUMERO_ORDEN = "4200043307";
            llave.DE_NUM_ACEPTACION = "";
            llave.DE_NUM_ARTICULO = "";
            llave.DE_NUM_DOC_SAP = "";
            llave.DE_NUM_FACTURA = "";
            llave.DE_NUM_MATERIAL = "";
            llave.DE_NUM_SERVICIO = "000000000001000144";
            llave.DE_PEDIDO = "";
            llave.DE_POSICION = "10";
            llave.DE_POS_DOC_MATERIAL = "0001";
            llave.DE_PRECIO = "30";
            llave.DE_SITUACION1 = "Entregado";
            llave.DE_SITUACION2 = "";
            llave.DE_SUBTOTAL = "";
            llave.DE_TIPO = "H";
            llave.DE_TOTAL = "492.00";
            llave.DE_UND_MEDIDA = "UN";
            llave.DOC_PROVEEDOR = "";
            llave.EM_RUC = "20221084684";
            llave.LOTE = "";
            llave.NON_CENTRO = "";
            llave.NOTA_RECEPCION = "";
            llave.NROSOLICITU = "";
            llave.NRO_CONTRATO = "";
            llave.RECEPTOR = "";
            llave.REFERENCIA = "";
            llave.SOLICITUDS = "";
            llave.UBICACION = "";
            llave.USUARIO = "";
            llave.US_RUC = "10157305102";

            var url = "" + this.varTableURL + "/";
            var oModel = new sap.ui.model.odata.v2.ODataModel(url, true);

            var oVectorJSON = JSON.stringify(llave);
            var oHeaders = { 'X-CSRF-Token': this.token };
            $.ajax(this.varTableURL + "/" + this.varTableT_OC_DET, {
                headers: oHeaders,
                data: oVectorJSON,
                type: "POST",
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    console.log("OK");
                }.bind(this),
                error: function (data) {
                    console.log("ERROR");
                }.bind(this)
            });
        },

        onAfterRendering: function (oEvent) {

            var oView = this.getView();
            var oModel = oView.getModel("myParam");
            oView.setModel(oModel);
            this.getView().setBusy(true);

            this.varGlobalContadorIniS = 0;
            this.varGlobalContadorIniE = 0;

            this.getView().byId("idItem1").setVisible(false);
            this.getView().byId("idItem2").setVisible(false);
            this.getView().byId("idItem3").setVisible(false);
            this.getView().byId("idItem4").setVisible(false);
            this.getView().byId("idItem5").setVisible(false);
            this.getView().byId("idItem6").setVisible(false);
            this.getView().byId("idItem7").setVisible(false);
            this.getView().byId("idItem8").setVisible(false);
            this.getView().byId("idItem9").setVisible(false);
            this.metTipoDeFechas();

            /*var userModel = new sap.ui.model.json.JSONModel("/services/userapi/currentUser");
            var oThis = this;
            this.getView().setModel(userModel, "userapi");
            userModel.attachRequestCompleted(function () {
                var oView = this.getView();
                var oModel = oView.getModel("myParam");
                var varUsuario = userModel.oData.displayName;
                //var varUsuario = "20100176450";
                console.log(varUsuario);
                oModel.setProperty("/usuarioLogin", varUsuario);
                oModel.setProperty("/usuarioLoginAlternativo", varUsuario);
            }.bind(this));*/

            $.ajax({
                type: "GET",
                // async: false,
                url: "cpbl/browse/obtUser",
                headers: {
                    ContentType: 'application/json',
                    Accept: 'application/json',
                    cache: false,
                    'X-CSRF-Token': 'Fetch'
                },
                success: function (data, textStatus, request) {
                    var oView = this.getView();
                    var oModel = oView.getModel("myParam");
                    oView.setModel(oModel);

                    console.log(data.value);
                    oModel.setProperty("/listTblOdataUsuarioPrincipal", data.value);

                    console.log(oModel.getProperty("/listTblOdataUsuarioPrincipal"));
                    var oListTblOdataUsuarioPrincipal = oModel.getProperty("/listTblOdataUsuarioPrincipal/0/Resp/id");
                    console.log(oListTblOdataUsuarioPrincipal);

                    // Tablas
                    this.varTableURL = oModel.getProperty("/listTablasOData/clistTablasODataURL");
                    this.varTableDocument = oModel.getProperty("/listTablasOData/clistTablasODataDocument");
                    this.varTableT_CEN = oModel.getProperty("/listTablasOData/clistTablasODataT_CEN");
                    this.varTableT_CON = oModel.getProperty("/listTablasOData/clistTablasODataT_CON");
                    this.varTableT_CON_DET = oModel.getProperty("/listTablasOData/clistTablasODataT_CON_DET");
                    this.varTableT_CRONOGRAMA = oModel.getProperty("/listTablasOData/clistTablasODataT_CRONOGRAMA");
                    this.varTableT_CTR_DET = oModel.getProperty("/listTablasOData/clistTablasODataT_CTR_DET");
                    this.varTableT_DOC = oModel.getProperty("/listTablasOData/clistTablasODataT_DOC");
                    this.varTableT_EMP = oModel.getProperty("/listTablasOData/clistTablasODataT_EMP");
                    this.varTableT_FAC = oModel.getProperty("/listTablasOData/clistTablasODataT_FAC");
                    this.varTableT_FAC_DET = oModel.getProperty("/listTablasOData/clistTablasODataT_FAC_DET");
                    this.varTableT_FAC_POS = oModel.getProperty("/listTablasOData/clistTablasODataT_FAC_POS");
                    this.varTableT_OC = oModel.getProperty("/listTablasOData/clistTablasODataT_OC");
                    this.varTableT_OC_DET = oModel.getProperty("/listTablasOData/clistTablasODataT_OC_DET");
                    this.varTableT_TIP_CAR = oModel.getProperty("/listTablasOData/clistTablasODataT_TIP_CAR");
                    this.varTableT_USER = oModel.getProperty("/listTablasOData/clistTablasODataT_USER");
                    this.varTableT_USUARIO_EMP = oModel.getProperty("/listTablasOData/clistTablasODataT_USUARIO_EMP");
                    this.varTableT_USUARIO_PRO = oModel.getProperty("/listTablasOData/clistTablasODataT_USUARIO_PRO");
                    this.varTableT_USUARIO_LOGIN = oModel.getProperty("/listTablasOData/clistTablasODataT_USUARIO_LOGIN");
                    this.varTableT_MAT_DETRACCION = oModel.getProperty("/listTablasOData/clistTablasODataT_MAT_DETRACCION"); //I@MM-01/03/2022-Ticket-2022-581
                    this.varTableT_SERV_DETRACCION = oModel.getProperty("/listTablasOData/clistTablasODataT_SERV_DETRACCION"); //I@MM-01/03/2022-Ticket-2022-581

                    this.llenarTablas("" + this.varTableT_MAT_DETRACCION + "", "listMatDetraccion"); //I@MM-01/03/2022-Ticket-2022-581
                    this.llenarTablas("" + this.varTableT_SERV_DETRACCION + "", "listServDetraccion"); //I@MM-01/03/2022-Ticket-2022-581
                    this.f_ShowAnuncio();
                    if (oModel.getProperty("/listUsuPrincipal/cUsuPrincipal")) {
                        oModel.setProperty("/usuarioLogin", oListTblOdataUsuarioPrincipal);
                        oModel.setProperty("/usuarioLogin3", oListTblOdataUsuarioPrincipal);
                        //this.oGlobalUsuarioAlternativo = oListTblOdataUsuarioPrincipal;
                        oModel.setProperty("/usuarioLoginAlternativo", oListTblOdataUsuarioPrincipal);
                        this.metObtenerUsuarioPrincipal();
                        oModel.setProperty("/listUsuPrincipal/cUsuPrincipal", false);
                    }

                    this.getView().byId("idTextoFooter").addStyleClass("styleTextoFooter");
                    this.getView().byId("idRUCProveedor").addStyleClass("styleRUCProveedor");

                    var today = new Date(); //this.funcionChangue();
                    var dd = today.getDate();
                    var MM = today.getMonth() + 1;
                    if (dd.toString().length === 1) {
                        dd = "0" + dd.toString();
                    }
                    if (MM.toString().length === 1) {
                        MM = "0" + MM.toString();
                    }
                    var yyyy = today.getFullYear();
                    this.byId("idFecha1").setFooter(yyyy + "/" + MM + "/" + dd);
                    this.byId("idFecha2").setFooter(yyyy + "/" + MM + "/" + dd);
                    var oModel = this.getView().getModel("myParam");

                    console.log(oModel.getProperty("/usuarioLogin"));
                    //this.getItemVisibles();

                    this.getView().byId("idItem1").setVisible(false);
                    this.getView().byId("idItem2").setVisible(false);
                    this.getView().byId("idItem3").setVisible(false);
                    this.getView().byId("idItem4").setVisible(false);
                    this.getView().byId("idItem5").setVisible(false);
                    this.getView().byId("idItem6").setVisible(false);
                    this.getView().byId("idItem7").setVisible(false);
                    this.getView().byId("idItem8").setVisible(false);
                    this.getView().byId("idItem9").setVisible(false);

                    this.getDataRucEmpresa();

                    /*oModel.setSizeLimit(1000);
                    var idComboTipoDoc = this.getView().byId("idRUC");
                    idComboTipoDoc.getBinding("items").refresh(true);
                    var firstItem = idComboTipoDoc.getItems()[0];
                    idComboTipoDoc.setSelectedItem(firstItem, true);
                    var varRUC = this.getView().byId("idRUC").getSelectedItem();
                    var descripcion = varRUC.getBindingContext("myParam").getObject().descripcion;
                    console.log(varRUC);
                    //console.log(varRUC.getKey()); 20220104
                    /*try {
                        oModel.setProperty("/usuarioRuc", varRUC.getKey());
                    } catch (error) {
                        this.getRouter().navTo("Vista_Login");
                        this.getView().setBusy(true);
                        window.location.reload();
                    }*//*
                    oModel.setProperty("/usuarioRucDes", descripcion);
                    this.getView().byId("idRUC").setValueState("None");*/

                    // Ubicar el proveedor correcto solo validos para usuarios ESTAN
                    /*var varTamCodigoRucProv = oModel.getProperty("/listaProveedoresRUC");
                    var varTamCodigoRucProvLogin = oModel.getProperty("/usuarioLogin");
                    var varTamCodigoRucProvLoginAlter = oModel.getProperty("/usuarioLoginAlternativo");
                    var varopcValidarExisteRUC = "N";
                    for (var z = 0; z < varTamCodigoRucProv.length; z++) {
                        var varCodiProveedor = oModel.getProperty("/listaProveedoresRUC/" + z + "/codigo");
                        var varAdminiProveedor = oModel.getProperty("/listaProveedoresRUC/" + z + "/descripcion");
                        var varAdminiTipo = oModel.getProperty("/listaProveedoresRUC/" + z + "/tipo");
                        if (varTamCodigoRucProvLoginAlter === varCodiProveedor && varAdminiTipo === "ADMIN") {
                            varopcValidarExisteRUC = "S";
                        } else if (varTamCodigoRucProvLoginAlter === varCodiProveedor && varAdminiTipo === "AVANZ") {
                            varopcValidarExisteRUC = "S";
                        }
                    }
                    if (varopcValidarExisteRUC === "S") {

                        var varTamCodigoRucProvLogin1 = "";
                        if (oModel.getProperty("/listOpcUsuario/cOpcUsuario") === "0") {
                            varTamCodigoRucProvLogin1 = varTamCodigoRucProvLogin;
                        } else if (oModel.getProperty("/listOpcUsuario/cOpcUsuario") === "1") {
                            varTamCodigoRucProvLogin1 = oModel.getProperty("/listUsuario");
                        }

                        for (var k = 0; k < varTamCodigoRucProv.length; k++) {
                            if (parseInt(oModel.getProperty("/listaProveedoresRUC/" + k + "/codigo"), 10) === parseInt(varTamCodigoRucProvLogin1, 10)) {
                                var comboDetra = this.getView().byId("idRUCProveedor");
                                comboDetra.getBinding("items").refresh(true);
                                var firstItem = comboDetra.getItems()[k];
                                comboDetra.setSelectedItem(firstItem, true);

                                var valor1 = oModel.getProperty("/listaProveedoresRUC/" + k + "/descripcion");
                                var valor2 = oModel.getProperty("/listaProveedoresRUC/" + k + "/codigo");
                                oModel.setProperty("/usuarioLoginDescripcionRuc", valor1);

                                var productInput = this.getView().byId("productInput");
                                productInput.setValue(valor2 + " - " + valor1);
                            }
                        }

                        this.getView().byId("idRUCProveedor").setEditable(false);
                        this.getView().byId("idRUCProveedor").setVisible(false);
                        this.getView().byId("productInput").setVisible(true);
                        this.getView().byId("idRUCProveedorNoAdmin1").setVisible(false);
                        this.getView().byId("idRUCProveedorNoAdmin2").setVisible(false);
                    } else {
                        this.getView().byId("idRUCProveedor").setEditable(false);
                        this.getView().byId("idRUCProveedor").setVisible(false);
                        this.getView().byId("productInput").setVisible(false);
                        this.getView().byId("idRUCProveedorNoAdmin1").setVisible(true);
                        this.getView().byId("idRUCProveedorNoAdmin2").setVisible(true);
                        oModel.setProperty("/listUsuario", oListTblOdataUsuarioPrincipal);
                    }*/

                    //this.getDataResFacReg();
                }.bind(this),
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("Status: " + textStatus);
                    console.log("Error: " + errorThrown);

                    var dialogMensajeSesion = new sap.m.Dialog({
                        draggable: true,
                        resizable: true,
                        contentWidth: "auto",
                        title: "Mensaje de alerta",
                        content: [
                            new sap.m.Label({
                                text: "Su tiempo de conexión ha caducado, por favor actualice la página", //20220318
                                wrapping: true,
                                width: "100%"
                            })
                        ],
                        state: "Warning",
                        type: "Message",
                        endButton: new sap.m.Button({
                            press: function () {
                                //this.getRouter().navTo("Vista_Login");
                                //sap.m.URLHelper.redirect("https://rivercon-com-s-a-c---cpea--redondos-smartprovider-j6mid7e2b85fb.cfapps.br10.hana.ondemand.com/index.html", false);
                                window.location.replace('./logout');
                                //window.location.reload();
                                dialogMensajeSesion.close();
                            }.bind(this),
                            text: "Aceptar"
                        }),
                        afterClose: function () {
                            dialogMensajeSesion.destroy();
                        },
                        verticalScrolling: false
                    });
                    dialogMensajeSesion.open();
                }.bind(this)
            });
            $("#splash-screen").remove();
            //this.showmessagepopover();
         
        },

        metTipoDeFechas: function () {

            var oView = this.getView();
            var oModel = oView.getModel("myParam");

            var today = new Date();
            var aa = today.getFullYear();

            oModel.setProperty("/oGlobalTipoFechaAnio01", aa);
            console.log(oModel.getProperty("/oGlobalTipoFechaAnio01"));
        },

        getDataRucEmpresa: function () {

            var oView = this.getView();
            var oModel = oView.getModel("myParam");
            oView.setModel(oModel);

            //var url = "/odatabnv/odata2.svc/";
            var url = "" + this.varTableURL + "/";
            var oModelJson = new sap.ui.model.odata.v2.ODataModel(url, true);
            //oModelJson.read("/T_CENs?$format=json", {
            /*oModelJson.read("/" + this.varTableT_CEN + "?$format=json", {*/
            $.ajax({
                type: "GET",
                //async: false,
                url: this.varTableURL + "/" + this.varTableT_CEN + "?$format=json",
                success: function (response) {
                    var oModelJSON = new sap.ui.model.json.JSONModel(response.value);
                    console.log(oModelJSON);
                    var tamTabla = oModelJSON.getData().length;
                    var vector = [];
                    var llave = {};
                    for (var i = 0; i < tamTabla; i++) {
                        llave = {};
                        llave.descripcion = oModelJSON.getData()[i].DES_EM;
                        llave.codigo = oModelJSON.getData()[i].RUC_EM;
                        vector.push(llave);
                    }
                    oModel.setProperty("/usuarioRuc", oModelJSON.getData()[0].RUC_EM);
                    oModel.setProperty("/listaEmpresasRUC", vector);

                    oModel.setSizeLimit(1000);
                    var idComboTipoDoc = this.getView().byId("idRUC");
                    idComboTipoDoc.getBinding("items").refresh(true);
                    var firstItem = idComboTipoDoc.getItems()[0];
                    idComboTipoDoc.setSelectedItem(firstItem, true);
                    var varRUC = this.getView().byId("idRUC").getSelectedItem();
                    var descripcion = varRUC.getBindingContext("myParam").getObject().descripcion;
                    console.log(varRUC);
                    oModel.setProperty("/usuarioRucDes", descripcion);
                    this.getView().byId("idRUC").setValueState("None");

                    this.getDataResFacReg();
                    this.getDataUser();

                    this.varGlobalContadorIniS++;
                    if ((this.varGlobalContadorIniS + this.varGlobalContadorIniE) === 3) {
                        this.getView().setBusy(false);
                        this.getItemVisibles();
                    }
                }.bind(this),
                error: function (oError) {
                    this.varGlobalContadorIniE++;
                    if ((this.varGlobalContadorIniS + this.varGlobalContadorIniE) === 3) {
                        this.getView().setBusy(false);
                        this.getItemVisibles();
                    }
                    oModel.setProperty("/listaEmpresasRUC", []);
                    // Mensaje de Alerta de que termino el tiempo de sesión
                    var dialogMensajeSesion = new sap.m.Dialog({
                        draggable: true,
                        resizable: true,
                        contentWidth: "auto",
                        title: "Mensaje de alerta",
                        content: [
                            new sap.m.Label({
                                text: "No se pudo establecer conexión con la base de datos. Por favor, acceder nuevamente o contactarse con el área de TI.",
                                wrapping: true,
                                width: "100%"
                            })
                        ],
                        state: "Warning",
                        type: "Message",
                        endButton: new sap.m.Button({
                            press: function () {
                                //this.getRouter().navTo("Vista_Login");
                                window.location.reload();
                                dialogMensajeSesion.close();
                            }.bind(this),
                            text: "Aceptar"
                        }),
                        afterClose: function () {
                            dialogMensajeSesion.destroy();
                        },
                        verticalScrolling: false
                    });
                    dialogMensajeSesion.open();
                }.bind(this)
            });


        },

        getDataUser: function () {

            var oView = this.getView();
            var oModel = oView.getModel("myParam");
            oView.setModel(oModel);

            this.getView().byId("productInput").setVisible(false);
            this.getView().byId("idListaProveedores").setVisible(false); //MM-AJUSTES-20240923

            //var url = "/odatabnv/odata2.svc/";
            var url = "" + this.varTableURL + "/";
            var oModelJson = new sap.ui.model.odata.v2.ODataModel(url, true);

            /*oModelJson.read("/" + this.varTableT_USER + "?$format=json", {*/
            var oThis = this;
            var oModel9 = oThis.getView().getModel("myParam");
            this.oGlobalStop10 = "S";
            this.oGlobalIteracion0 = "0";
            oModel9.setProperty("/oListaVectorCabeceraDetalle", []);
            this.oEntrar = "N";
            while (this.oGlobalStop10 === "S") {
                $.ajax({
                    type: "GET",
                    async: false,
                    url: this.varTableURL + "/" + this.varTableT_USER + "?$skiptoken=" + this.oGlobalIteracion0 + "&$format=json",
                    success: function (response) {

                        var oDataHana = response.value;

                        console.log(oDataHana.length);
                        if (oDataHana.length !== 0) {

                            var oMatriz = oModel9.getProperty("/oListaVectorCabeceraDetalle");
                            var oVector = {};
                            if (oDataHana.length !== 0) {
                                for (var i = 0; i < oDataHana.length; i++) {
                                    oVector = {};
                                    oVector = oDataHana[i];
                                    oMatriz.push(oVector);
                                }
                                oModel9.setProperty("/oListaVectorCabeceraDetalle", oMatriz);
                            } else {
                                oModel9.setProperty("/oListaVectorCabeceraDetalle", []);
                            }
                            console.log(oModel9.getProperty("/oListaVectorCabeceraDetalle"));

                            var oParametro10 = parseInt(this.oGlobalIteracion0, 10);
                            oParametro10 = oParametro10 + 1000;
                            this.oGlobalIteracion0 = oParametro10.toString();
                            console.log(this.oGlobalIteracion0);
                            this.oGlobalStop10 = "S";
                        } else {
                            this.oGlobalStop10 = "N";
                            this.oEntrar = "S";
                        }

                        if (this.oEntrar === "S") {
                            //var oModelJSON = new sap.ui.model.json.JSONModel(response.value);
                            var oModelJSON = oModel9.getProperty("/oListaVectorCabeceraDetalle");
                            console.log(oModelJSON);
                            var tamTabla = oModelJSON.length;
                            var vector = [];
                            var llave = {};
                            for (var i = 0; i < tamTabla; i++) {
                                llave = {};
                                llave.descripcion = oModelJSON[i].NOM_USUARIO;
                                llave.codigo = oModelJSON[i].US_USUARIO;
                                llave.tipo = oModelJSON[i].AUTORIZACION;
                                vector.push(llave);
                            }
                            var model = this.getView().getModel();
                            model.setSizeLimit(500);
                            oModel.setProperty("/listaProveedoresRUC", vector);

                            var varTamCodigoRucProv = oModel.getProperty("/listaProveedoresRUC");
                            var varTamCodigoRucProvLogin = oModel.getProperty("/usuarioLogin");
                            var varTamCodigoRucProvLoginAlter = oModel.getProperty("/usuarioLoginAlternativo");
                            var varopcValidarExisteRUC = "N";
                            for (var z = 0; z < varTamCodigoRucProv.length; z++) {
                                var varCodiProveedor = oModel.getProperty("/listaProveedoresRUC/" + z + "/codigo");
                                var varAdminiProveedor = oModel.getProperty("/listaProveedoresRUC/" + z + "/descripcion");
                                var varAdminiTipo = oModel.getProperty("/listaProveedoresRUC/" + z + "/tipo");
                                if (varTamCodigoRucProvLoginAlter === varCodiProveedor && varAdminiTipo === "ADMIN") {
                                    varopcValidarExisteRUC = "S";
                                } else if (varTamCodigoRucProvLoginAlter === varCodiProveedor && varAdminiTipo === "AVANZ") {
                                    varopcValidarExisteRUC = "S";
                                }
                            }
                            if (varopcValidarExisteRUC === "S") {

                                var varTamCodigoRucProvLogin1 = "";
                                if (oModel.getProperty("/listOpcUsuario/cOpcUsuario") === "0") {
                                    varTamCodigoRucProvLogin1 = varTamCodigoRucProvLogin;
                                } else if (oModel.getProperty("/listOpcUsuario/cOpcUsuario") === "1") {
                                    varTamCodigoRucProvLogin1 = oModel.getProperty("/listUsuario");
                                }

                                for (var k = 0; k < varTamCodigoRucProv.length; k++) {
                                    if (parseInt(oModel.getProperty("/listaProveedoresRUC/" + k + "/codigo"), 10) === parseInt(varTamCodigoRucProvLogin1, 10)) {
                                        var comboDetra = this.getView().byId("idRUCProveedor");
                                        comboDetra.getBinding("items").refresh(true);
                                        var firstItem = comboDetra.getItems()[k];
                                        comboDetra.setSelectedItem(firstItem, true);

                                        var valor1 = oModel.getProperty("/listaProveedoresRUC/" + k + "/descripcion");
                                        var valor2 = oModel.getProperty("/listaProveedoresRUC/" + k + "/codigo");
                                        oModel.setProperty("/usuarioLoginDescripcionRuc", valor1);

                                        var productInput = this.getView().byId("productInput");
                                        productInput.setValue(valor2 + " - " + valor1);
                                    }
                                }

                                this.getView().byId("idRUCProveedor").setEditable(false);
                                this.getView().byId("idRUCProveedor").setVisible(false);
                                this.getView().byId("productInput").setVisible(true);
                                this.getView().byId("idListaProveedores").setVisible(true); //MM-AJUSTES-20240923
                                this.getView().byId("idRUCProveedorNoAdmin1").setVisible(false);
                                this.getView().byId("idRUCProveedorNoAdmin2").setVisible(false);
                            } else {
                                this.getView().byId("idRUCProveedor").setEditable(false);
                                this.getView().byId("idRUCProveedor").setVisible(false);
                                this.getView().byId("productInput").setVisible(false);
                                this.getView().byId("idListaProveedores").setVisible(false); //MM-AJUSTES-20240923
                                this.getView().byId("idRUCProveedorNoAdmin1").setVisible(true);
                                this.getView().byId("idRUCProveedorNoAdmin2").setVisible(true);
                                //oModel.setProperty("/listUsuario", oListTblOdataUsuarioPrincipal);
                                oModel.setProperty("/listUsuario", oModel.getProperty("/usuarioLogin3"));
                                oModel.setProperty("/usuarioLogin", oModel.getProperty("/usuarioLogin3"));
                            }

                            this.varGlobalContadorIniS++;
                            if ((this.varGlobalContadorIniS + this.varGlobalContadorIniE) === 3) {
                                this.getView().setBusy(false);
                                this.getItemVisibles();
                            }
                        }

                    }.bind(this),
                    error: function (oError) {

                        this.varGlobalContadorIniE++;
                        if ((this.varGlobalContadorIniS + this.varGlobalContadorIniE) === 3) {
                            this.getView().setBusy(false);
                            this.getItemVisibles();
                        }
                        oModel.setProperty("/listaProveedoresRUC", []);
                        // Mensaje de Alerta de que termino el tiempo de sesión
                        var dialogMensajeSesion = new sap.m.Dialog({
                            draggable: true,
                            resizable: true,
                            contentWidth: "auto",
                            title: "Mensaje de alerta",
                            content: [
                                new sap.m.Label({
                                    text: "No se pudo establecer conexión con la base de datos. Por favor, acceder nuevamente o contactarse con el área de TI.",
                                    wrapping: true,
                                    width: "100%"
                                })
                            ],
                            state: "Warning",
                            type: "Message",
                            endButton: new sap.m.Button({
                                press: function () {
                                    this.getRouter().navTo("Vista_Login");
                                    this.getView().setBusy(true);
                                    window.location.reload();
                                    dialogMensajeSesion.close();
                                    this.getView().setBusy(true);
                                }.bind(this),
                                text: "Aceptar"
                            }),
                            afterClose: function () {
                                dialogMensajeSesion.destroy();
                            },
                            verticalScrolling: false
                        });
                        dialogMensajeSesion.open();
                    }.bind(this)
                });
            }
        },
        //FRAGMENT DE ANUNCIO 
        f_ShowAnuncio: function () { 
            var oModel = this.getView().getModel("myParam");
            let indicador = oModel.getProperty("/indicadorShowAnuncio"); 
            if(!indicador){ //indicador siempre inicia en falso 
                oModel.setProperty("/indicadorShowAnuncio",true);  //cambiar indicador de mostrar anuncios
                this.oGlobalIteracion0 = "0";
                //obtener imagen de banner 
                $.ajax(this.varTableURL + "/T_ANUNCIOS?$format=json&$skiptoken=" + this.oGlobalIteracion0 + "&$filter=ESTADO eq 'X'", {
                    headers: { 'X-CSRF-Token': this.token },
                    type: "GET",
                    contentType: "application/json",
                    dataType: "json",
                    success: function (res) { 
                        console.log("f_ShowAnuncio", res.value);
                        oModel.setProperty("/listAnuncios",res.value); 
                        if(res.value.length > 0){  this._dgShowAnuncio().open(); } 
                    }.bind(this),
                    error: function (error) { console.log("error GET registro de anuncio",error); }.bind(this)
                }); 
            }
        },
        _dgShowAnuncio: function () {
            // var oModel = this.getView().getModel("myParam"); 
            var oView = this.getView();
            if (!this.dgAnuncio) { this.dgAnuncio = sap.ui.xmlfragment("iddgAnuncio", "nsrdos.uiportalprov_qas.view.fragments.dgAnuncio", this) };
            oView.addDependent(this.dgAnuncio);
            return this.dgAnuncio  
        },
        f_CancelShowAnuncio: function () { this._dgShowAnuncio().close() },
        pressimage: function (oEvent) {
            var url = oEvent.getSource().getBindingContext("myParam").getObject().FILE_IMG_URL;      
            
            (url.trim().length>0)?URLHelper.redirect(url, true):"";

        },        
        onBeforeRendering: function (oEvent) {

        },
        onExit: function () {

        },
        getRouter: function () {

            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        changeRucEvt: function (evt) {

            var oModel = this.getView().getModel("myParam");
            var usuarioRuc = "";
            var usuarioRucDes = "";
            var item = evt.getSource().getSelectedItem();
            if (item !== null && item !== undefined) {
                usuarioRuc = item.getKey();
                usuarioRucDes = item.getBindingContext("myParam").getObject();
                oModel.setProperty("/usuarioRuc", usuarioRuc);
                oModel.setProperty("/usuarioRucDes", usuarioRucDes.descripcion);
                sap.m.MessageToast.show("Se actualizó el RUC de la empresa : " + usuarioRuc);
                evt.getSource().setValueState("None");
            } else {
                usuarioRuc = "";
                oModel.setProperty("/usuarioRuc", usuarioRuc);
                oModel.setProperty("/usuarioRucDes", usuarioRucDes);
                sap.m.MessageToast.show("No ha seleccionado ningún RUC de la empresa.");
                evt.getSource().setValueState("Error");
            }
            this.getDataResFacReg();
        },

        changeRucEvtProv: function (evt) {

            var oModel = this.getView().getModel("myParam");
            var usuarioRucProv = "";
            var item = evt.getSource().getSelectedItem();
            if (item !== null && item !== undefined) {
                usuarioRucProv = item.getKey();
                oModel.setProperty("/usuarioLogin", usuarioRucProv);
                sap.m.MessageToast.show("Se actualizó el RUC del proveedor : " + usuarioRucProv);
                evt.getSource().setValueState("None");

                var varListaRucDes = oModel.getProperty("/listaProveedoresRUC");
                for (var i = 0; i < varListaRucDes.length; i++) {
                    if (varListaRucDes[i].codigo === usuarioRucProv) {
                        var varDescripcionDelRuc = varListaRucDes[i].descripcion;
                    }
                }
                oModel.setProperty("/usuarioLoginDescripcionRuc", varDescripcionDelRuc);

            } else {
                usuarioRucProv = "";
                oModel.setProperty("/usuarioLogin", usuarioRucProv);
                sap.m.MessageToast.show("No ha seleccionado ningún RUC de proveedor.");
                evt.getSource().setValueState("Error");
            }
            this.getItemVisibles();
        },

        handleValueHelp: function (oEvent) {

            this.inputId = oEvent.getSource().getId();
            var oModel = this.getView().getModel("myParam");
            sap.ui.getCore().setModel(oModel);

            var pressDialog = new sap.m.SelectDialog({
                noDataText: "No existen datos de proveedores",
                title: "Lista de Proveedores",
                search: [this.handleSearch, this],
                confirm: [this.handleClose, this],
                // close: [this.handleClose, this],
                items: {
                    path: "myParam>/listaProveedoresRUC",
                    template: new sap.m.StandardListItem({
                        icon: "sap-icon://building",
                        title: "{myParam>descripcion}",
                        description: "RUC : {myParam>codigo}",
                        type: "Active"
                    })
                }/*,
				beginButton: new sap.m.Button({
					text: "Close",
					type: "Reject",
					press: function () {
						pressDialog.close();
					},
					afterClose: function () {
						pressDialog.destroy();
					}
				})*/
            });
            pressDialog.setModel(oModel);
            this.getView().addDependent(pressDialog);
            pressDialog.open();
        },

        handleSearch: function (oEvt) {

            var sValue = oEvt.getParameter("value");

            var oFilter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("codigo", sap.ui.model.FilterOperator.Contains, sValue),
                    new sap.ui.model.Filter("descripcion", sap.ui.model.FilterOperator.Contains, sValue)
                ],
                and: false
            });

            var oBinding = oEvt.getSource().getBinding("items");
            oBinding.filter([oFilter], "Application");
        },

        handleClose: function (oEvent) {

            var oModel = this.getView().getModel("myParam");

            var aContexts = oEvent.getParameter("selectedContexts");
            if (aContexts.length) {
                var valor = aContexts.map(function (oContext) {
                    return oContext.getObject().descripcion;
                }).join(", ");
                var valor2 = aContexts.map(function (oContext) {
                    return oContext.getObject().codigo;
                }).join(", ");
                var productInput = this.getView().byId("productInput");
                productInput.setValue(valor2 + " - " + valor);
                oModel.setProperty("/usuarioLogin", valor2);
                sap.m.MessageToast.show("Se actualizó el RUC del proveedor : " + valor2);
                oModel.setProperty("/usuarioLoginDescripcionRuc", valor);
                this.getDataResFacReg();
                this.getItemVisibles();

                oModel.setProperty("/listOpcUsuario/cOpcUsuario", "1");
                oModel.setProperty("/listUsuario", valor2);
            }
            oEvent.getSource().getBinding("items").filter([]);
        },

        btnListaProveedores: function () { //MM-AJUSTES-20240923

            var oView = this.getView();
            if (!this.pDialog_cliente) {
                this.pDialog_cliente = Fragment.load({
                    id: oView.getId(),
                    name: "nsrdos.uiportalprov_qas.view.fragments.dgDialogAyudaCliente",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this.pDialog_cliente.then(function (oDialog) {
                oDialog.open();
                this.byId("txt_filtro_proveedor").setValue("");
                this.f_filtra_ayuda_busqueda_proveedor_inicio("");
            }.bind(this));
        },

        f_filtra_ayuda_busqueda_proveedor_inicio: function (s_cod) { //MM-AJUSTES-20240923

            var sValue = s_cod;

            var oFilter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("codigo", sap.ui.model.FilterOperator.Contains, sValue),
                    new sap.ui.model.Filter("descripcion", sap.ui.model.FilterOperator.Contains, sValue)
                ],
                and: false
            });

            this.byId("list_proveedor").getBinding("items").filter([oFilter]);
        },

        f_filtra_ayuda_busqueda_proveedor: function (oEvt) { //MM-AJUSTES-20240923

            var sValue = oEvt.getParameter("value");

            var oFilter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("codigo", sap.ui.model.FilterOperator.Contains, sValue),
                    new sap.ui.model.Filter("descripcion", sap.ui.model.FilterOperator.Contains, sValue)
                ],
                and: false
            });

            this.byId("list_proveedor").getBinding("items").filter([oFilter]);
        },

        f_acepta_ayuda_busqueda_proveedor: function () { //MM-AJUSTES-20240923

            if (this.byId("list_proveedor").getSelectedItem() == undefined) {
                sap.m.MessageToast.show("Es necesario que seleccione un proveedor");
                return;
            }
            else {
                var oModel = this.getView().getModel("myParam");

                console.log('asfa');
                console.log(this.byId("list_proveedor").getSelectedItem());
                var v_codigo_cliente = this.byId("list_proveedor").getSelectedItem().getProperty("title");
                var v_descripcion_cliente = this.byId("list_proveedor").getSelectedItem().getProperty("description");

                console.log('v_codigo_cliente');
                console.log(v_codigo_cliente);
                console.log('v_descripcion_cliente');
                console.log(v_descripcion_cliente);

                var valor = v_descripcion_cliente;
                var valor2 = v_codigo_cliente;
                var productInput = this.getView().byId("productInput");
                productInput.setValue(valor2 + " - " + valor);
                oModel.setProperty("/usuarioLogin", valor2);
                sap.m.MessageToast.show("Se actualizó el RUC del proveedor : " + valor2);
                oModel.setProperty("/usuarioLoginDescripcionRuc", valor);
                this.getDataResFacReg();
                this.getItemVisibles();

                oModel.setProperty("/listOpcUsuario/cOpcUsuario", "1");
                oModel.setProperty("/listUsuario", valor2);

                this.getView().byId("dialog_table_proveedor").close();
                console.log("cerrado destruido");
            }
        },

        f_cierra_dialog_proveedor: function () { //MM-AJUSTES-20240923

            this.getView().byId("dialog_table_proveedor").close();
            console.log("cerrado destruido");
        },

        btnItemSin: function () {
            var dialog = new sap.m.Dialog({
                icon: "sap-icon://batch-payments",
                title: "Registro factura por Misceláneos",
                type: "Message",
                state: "Information",
                content: [
                    new sap.ui.layout.VerticalLayout({
                        width: "100%",
                        content: [
                            new sap.m.Toolbar({
                                width: "100%",
                                content: [
                                    new sap.m.Text({
                                        text: "¿De qué forma quiere realizar dicho procedimiento?",
                                        width: "100%"
                                    })
                                ]
                            }),
                            new sap.m.Button({
                                text: "Carga XML",
                                icon: "sap-icon://upload",
                                width: "100%",
                                type: "Emphasized",
                                press: function () {
                                    this.getRouter().navTo("Vista_Registro_Factura_Sin_Vale");
                                    dialog.close();
                                }.bind(this)
                            }),
                            new sap.m.Button({
                                text: "Manual",
                                icon: "sap-icon://keyboard-and-mouse",
                                width: "100%",
                                type: "Emphasized",
                                press: function () {
                                    this.getRouter().navTo("Vista_Registro_Factura_Manual");
                                    dialog.close();
                                }.bind(this)
                            })
                        ]
                    })
                ],
                beginButton: new sap.m.Button({
                    text: "Cerrar",
                    icon: "sap-icon://decline",
                    press: function () {
                        dialog.close();
                    }
                }),
                afterClose: function () {
                    dialog.destroy();
                }
            });

            dialog.open();

        },
        btnItemFac: function () {
            var dialog = new sap.m.Dialog({
                icon: "sap-icon://expense-report",
                title: "Registro de factura",
                type: "Message",
                state: "Information",
                content: [
                    new sap.ui.layout.VerticalLayout({
                        width: "100%",
                        content: [
                            new sap.m.Toolbar({
                                width: "100%",
                                content: [
                                    new sap.m.Text({
                                        text: "¿De qué forma quiere realizar dicho procedimiento?",
                                        width: "100%"
                                    })
                                ]
                            }),
                            new sap.m.Button({
                                text: "Carga XML",
                                icon: "sap-icon://upload",
                                width: "100%",
                                type: "Emphasized",
                                press: function () {
                                    this.getRouter().navTo("Vista_Registro_Factura");
                                    dialog.close();
                                }.bind(this)
                            }),
                            new sap.m.Button({
                                text: "Manual",
                                icon: "sap-icon://keyboard-and-mouse",
                                width: "100%",
                                type: "Emphasized",
                                press: function () {
                                    this.getRouter().navTo("Vista_Registro_Factura_Manual");
                                    dialog.close();
                                }.bind(this)
                            })
                        ]
                    })
                ],
                beginButton: new sap.m.Button({
                    text: "Cerrar",
                    icon: "sap-icon://decline",
                    press: function () {
                        dialog.close();
                    }
                }),
                afterClose: function () {
                    dialog.destroy();
                }
            });

            dialog.open();

        },

        btnItemFacNew: function () {
            this.getRouter().navTo("Vista_Registro_Factura");
            $("#splash-screen").remove();
        },
        btnItemSinNew: function () {
            this.getRouter().navTo("Vista_Registro_Factura_Sin_Vale");
            this.getDataCentro();
        },
        btnItem1: function () {

            this.getRouter().navTo("Vista_Orden_Compra");
        },

        btnItem2: function () {
            this.getRouter().navTo("Vista_Reporte_Factura");
        },

        btnItemConsignacion: function () {
            this.getRouter().navTo("Vista_Registro_Consignacion");
        },

        btnItemDevSinPedido: function () {
            this.getRouter().navTo("Vista_Registro_DevSinPedido");
        },

        btnItemReporConsignacion: function () {
            this.getRouter().navTo("Vista_Reporte_Consiganciones");
        },

        btnItemContratista: function () {
            //this.btnDialogMensajeApliNotFound();
            this.getRouter().navTo("Vista_Registro_Contratista");
        },

        btnItemAdmiUsuarios: function () {
            //this.btnDialogMensajeApliNotFound();
            this.getRouter().navTo("Vista_Administrador_Usuarios");
        },

        btnItemPedConDevo: function () {
            //this.btnDialogMensajeApliNotFound();
            this.getRouter().navTo("Vista_Registro_PedConDev");
        },

        btnItem10: function () {
            this.getRouter().navTo("Vista_Reporte_Fac_Registradas");
        },

        btnItemVale: function () {
            this.getRouter().navTo("Vista_Reporte_Vale");
        },

        btnEditar: function (evt) {

            var oTileContainer = this.byId("idContainer");
            var newValue = !oTileContainer.getEditable();
            oTileContainer.setEditable(newValue);
            evt.getSource().setText(newValue ? "Guardar" : "Editar");
        },

        getDataCentro: function () {

            var oView = this.getView();
            var oModel = oView.getModel("myParam");
            oView.setModel(oModel);

            //var url = "/odatabnv/odata2.svc/";
            var url = "" + this.varTableURL + "/";
            var oModelJson = new sap.ui.model.odata.v2.ODataModel(url, true);
            var varRUC = oModel.getProperty("/usuarioRuc");
            var filters = [];
            var filter;

            filter = new sap.ui.model.Filter("RUC_EM", sap.ui.model.FilterOperator.EQ, varRUC);
            filters.push(filter);

            //oModelJson.read("/T_EMPs?$format=json", {
            /*oModelJson.read("/" + this.varTableT_EMP + "?$format=json", {
                filters: filters,*/
            $.ajax({
                type: "GET",
                url: this.varTableURL + "/" + this.varTableT_EMP + "?$format=json&$filter=RUC_EM eq '" + varRUC + "'",
                success: function (response) {
                    var oModelJSON = new sap.ui.model.json.JSONModel(response.value);
                    var tamTabla = oModelJSON.getData().length;
                    var vector = [];
                    var llave = {};
                    for (var i = 0; i < tamTabla; i++) {
                        llave = {};
                        llave.descripcion = oModelJSON.getData()[i].DES_CEN;
                        llave.codigo = oModelJSON.getData()[i].COD_CEN;
                        vector.push(llave);
                    }
                    oModel.setProperty("/listCentroEmp", vector);
                }.bind(this),
                error: function (oError) {
                    oModel.setProperty("/listCentroEmp", []);
                    // Mensaje de Alerta de que termino el tiempo de sesión
                    var dialogMensajeSesion = new sap.m.Dialog({
                        draggable: true,
                        resizable: true,
                        contentWidth: "auto",
                        title: "Mensaje de alerta",
                        content: [
                            new sap.m.Label({
                                text: "No se pudo establecer conexión con la base de datos. Por favor, acceder nuevamente o contactese con el área de TI.",
                                wrapping: true,
                                width: "100%"
                            })
                        ],
                        state: "Warning",
                        type: "Message",
                        endButton: new sap.m.Button({
                            press: function () {
                                this.getRouter().navTo("Vista_Login");
                                this.getView().setBusy(true);
                                window.location.reload();
                                dialogMensajeSesion.close();
                                this.getView().setBusy(true);
                            }.bind(this),
                            text: "Aceptar"
                        }),
                        afterClose: function () {
                            dialogMensajeSesion.destroy();
                        },
                        verticalScrolling: false
                    });
                    dialogMensajeSesion.open();
                }.bind(this)
            });

            /*oModelJson.read("/" + this.varTableT_USER + "?$format=json", {*/
            $.ajax({
                type: "GET",
                url: this.varTableURL + "/" + this.varTableT_USER + "?$format=json",
                success: function (response) {
                    var oModelJSON = new sap.ui.model.json.JSONModel(response.value);
                    var tamTabla = oModelJSON.getData().length;
                    var vector = [];
                    var llave = {};
                    for (var i = 0; i < tamTabla; i++) {
                        llave = {};
                        llave.descripcion = oModelJSON.getData()[i].NOM_USUARIO;
                        llave.codigo = oModelJSON.getData()[i].US_USUARIO;
                        llave.tipo = oModelJSON.getData()[i].AUTORIZACION;
                        vector.push(llave);
                    }
                    var model = this.getView().getModel();
                    oModel.setSizeLimit(vector.length);
                    oModel.setProperty("/listaProveedoresRUC", vector);
                }.bind(this),
                error: function (oError) {
                    oModel.setProperty("/listaProveedoresRUC", []);
                    // Mensaje de Alerta de que termino el tiempo de sesión
                    var dialogMensajeSesion = new sap.m.Dialog({
                        draggable: true,
                        resizable: true,
                        contentWidth: "auto",
                        title: "Mensaje de alerta",
                        content: [
                            new sap.m.Label({
                                text: "No se pudo establecer conexión con la base de datos. Por favor, acceder nuevamente o contactese con el área de TI.",
                                wrapping: true,
                                width: "100%"
                            })
                        ],
                        state: "Warning",
                        type: "Message",
                        endButton: new sap.m.Button({
                            press: function () {
                                this.getRouter().navTo("Vista_Login");
                                this.getView().setBusy(true);
                                window.location.reload();
                                dialogMensajeSesion.close();
                                this.getView().setBusy(true);
                            }.bind(this),
                            text: "Aceptar"
                        }),
                        afterClose: function () {
                            dialogMensajeSesion.destroy();
                        },
                        verticalScrolling: false
                    });
                    dialogMensajeSesion.open();
                }.bind(this)
            });
        },

        /*funcionChangue: function(){
        	
            var carousel = this.getView().byId("carouselSample");
            setTimeout(function() { carousel.next(); }, 2500);
            //carousel.placeAt("content");
        }*/

        btnDialogMensajeApliNotFound: function () {

            var dialog = new sap.m.Dialog({
                icon: "sap-icon://expense-report",
                title: "Mensaje",
                type: "Message",
                state: "Information",
                content: [
                    new sap.m.Text({
                        text: "Este Item esta en Desarrollo",
                        width: "100%"
                    })
                ],
                beginButton: new sap.m.Button({
                    text: "Aceptar",
                    icon: "sap-icon://accept",
                    press: function () {
                        dialog.close();
                    }
                }),
                afterClose: function () {
                    dialog.destroy();
                }
            });

            dialog.open();
        },

        getItemVisibles: function () {
            console.log("getItemVisibles");

            // Llamar modelo
            var oThis = this;
            var oModel = oThis.getView().getModel("myParam");

            var varUsuario = oModel.getProperty("/usuarioLogin");
            var usuarioReal = oModel.getProperty("/usuarioReal");
            var tipoDeUsuario = oModel.getProperty("/tipoDeUsuario");
            console.log(varUsuario);
            console.log(usuarioReal);

            console.log(usuarioReal);
            console.log(tipoDeUsuario);
            //var url = "/odatabnv/odata2.svc/";
            var url = "" + this.varTableURL + "/";
            var oModelJson = new sap.ui.model.odata.v2.ODataModel(url, true);

            var filters = [];
            var filter;
            var varOpcFilter = "";
            if (tipoDeUsuario === "AVANZ") {
                filter = new sap.ui.model.Filter("US_USUARIO", sap.ui.model.FilterOperator.EQ, usuarioReal);
                filters.push(filter);
                varOpcFilter = usuarioReal;
            } else {
                filter = new sap.ui.model.Filter("US_USUARIO", sap.ui.model.FilterOperator.EQ, varUsuario);
                filters.push(filter);
                varOpcFilter = varUsuario;
            }
            console.log("/" + this.varTableT_USER + "?$format=json");
            console.log(filters);
            //oModelJson.read("/T_USERs?$format=json", {
            /*oModelJson.read("/" + this.varTableT_USER + "?$format=json", {
                filters: filters,*/
            console.log(this.varTableURL + "/" + this.varTableT_USER + "?$format=json&$filter=US_USUARIO eq '" + varOpcFilter + "'");
            $.ajax({
                type: "GET",
                url: this.varTableURL + "/" + this.varTableT_USER + "?$format=json&$filter=US_USUARIO eq '" + varOpcFilter + "'",
                success: function (response) {
                    console.log(response);
                    console.log(new sap.ui.model.json.JSONModel(response));
                    var oModelJSON = new sap.ui.model.json.JSONModel(response.value);
                    var vartblUser = oModelJSON.getData();
                    console.log(vartblUser[0]);
                    if (vartblUser.length !== 0) {
                        var varAutorizacion = vartblUser[0].AUTORIZACION;
                        var varSeccion1 = vartblUser[0].SEC_1;
                        var varSeccion2 = vartblUser[0].SEC_2;
                        var varSeccion3 = vartblUser[0].SEC_3;
                        var varSeccion4 = vartblUser[0].SEC_4;
                        var varSeccion5 = vartblUser[0].SEC_5;
                        var varSeccion6 = vartblUser[0].SEC_6;
                        var varSeccion7 = vartblUser[0].SEC_7;
                        var varSeccion8 = vartblUser[0].SEC_8;

                        this.getView().byId("idItem10").setVisible(true);
                        if (varAutorizacion === "ADMIN") {
                            this.getView().byId("idItem1").setVisible(true);
                            this.getView().byId("idItem2").setVisible(true);
                            this.getView().byId("idItem3").setVisible(false);
                            this.getView().byId("idItem4").setVisible(false);
                            this.getView().byId("idItem5").setVisible(false);
                            this.getView().byId("idItem6").setVisible(true);
                            this.getView().byId("idItem7").setVisible(true);
                            this.getView().byId("idItem8").setVisible(false);
                            this.getView().byId("idItem9").setVisible(true);
                        } else if (varAutorizacion === "AVANZ") {
                            if (varSeccion1 === "x") {
                                this.getView().byId("idItem1").setVisible(true);
                            } else {
                                this.getView().byId("idItem1").setVisible(false);
                            }

                            if (varSeccion2 === "x") {
                                this.getView().byId("idItem2").setVisible(true);
                            } else {
                                this.getView().byId("idItem2").setVisible(false);
                            }

                            if (varSeccion3 === "x") {
                                this.getView().byId("idItem3").setVisible(true);
                            } else {
                                this.getView().byId("idItem3").setVisible(false);
                            }

                            if (varSeccion4 === "x") {
                                this.getView().byId("idItem4").setVisible(true);
                            } else {
                                this.getView().byId("idItem4").setVisible(false);
                            }

                            if (varSeccion5 === "x") {
                                this.getView().byId("idItem5").setVisible(true);
                            } else {
                                this.getView().byId("idItem5").setVisible(false);
                            }

                            if (varSeccion6 === "x") {
                                this.getView().byId("idItem6").setVisible(true);
                            } else {
                                this.getView().byId("idItem6").setVisible(false);
                            }

                            if (varSeccion7 === "x") {
                                this.getView().byId("idItem7").setVisible(true);
                            } else {
                                this.getView().byId("idItem7").setVisible(false);
                            }

                            if (varSeccion8 === "x") {
                                this.getView().byId("idItem8").setVisible(true);
                            } else {
                                this.getView().byId("idItem8").setVisible(false);
                            }

                            // this.getView().byId("idItem1").setVisible(false);
                            // this.getView().byId("idItem2").setVisible(false);
                            // this.getView().byId("idItem3").setVisible(false);
                            // this.getView().byId("idItem4").setVisible(false);
                            // this.getView().byId("idItem5").setVisible(false);
                            // this.getView().byId("idItem6").setVisible(false);

                            // this.getView().byId("idItem10").setVisible(true);
                            // this.getView().byId("idItem7").setVisible(true);
                            // this.getView().byId("idItem11").setVisible(true);
                            // this.getView().byId("idItem8").setVisible(true);

                            this.getView().byId("idItem9").setVisible(false);


                        } else {
                            if (varSeccion1 === "x") {
                                this.getView().byId("idItem1").setVisible(true);
                            } else {
                                this.getView().byId("idItem1").setVisible(false);
                            }

                            if (varSeccion2 === "x") {
                                this.getView().byId("idItem2").setVisible(true);
                            } else {
                                this.getView().byId("idItem2").setVisible(false);
                            }

                            if (varSeccion3 === "x") {
                                this.getView().byId("idItem3").setVisible(true);
                            } else {
                                this.getView().byId("idItem3").setVisible(false);
                            }

                            if (varSeccion4 === "x") {
                                this.getView().byId("idItem4").setVisible(true);
                            } else {
                                this.getView().byId("idItem4").setVisible(false);
                            }

                            if (varSeccion5 === "x") {
                                this.getView().byId("idItem5").setVisible(true);
                            } else {
                                this.getView().byId("idItem5").setVisible(false);
                            }

                            if (varSeccion6 === "x") {
                                this.getView().byId("idItem6").setVisible(true);
                            } else {
                                this.getView().byId("idItem6").setVisible(false);
                            }

                            if (varSeccion7 === "x") {
                                this.getView().byId("idItem7").setVisible(true);
                            } else {
                                this.getView().byId("idItem7").setVisible(false);
                            }

                            if (varSeccion8 === "x") {
                                this.getView().byId("idItem8").setVisible(true);
                            } else {
                                this.getView().byId("idItem8").setVisible(false);
                            }
                            this.getView().byId("idItem9").setVisible(false);
                        }
                    } else {
                        this.getView().byId("idItem1").setVisible(false);
                        this.getView().byId("idItem2").setVisible(false);
                        this.getView().byId("idItem3").setVisible(false);
                        this.getView().byId("idItem4").setVisible(false);
                        this.getView().byId("idItem5").setVisible(false);
                        this.getView().byId("idItem6").setVisible(false);
                        this.getView().byId("idItem7").setVisible(false);
                        this.getView().byId("idItem8").setVisible(false);
                        this.getView().byId("idItem9").setVisible(false);
                        this.getView().byId("idItem10").setVisible(false);
                    }
                }.bind(this),
                error: function (oError) {
                    // Mensaje de Alerta de que termino el tiempo de sesión
                    var dialogMensajeSesion = new sap.m.Dialog({
                        draggable: true,
                        resizable: true,
                        contentWidth: "auto",
                        title: "Mensaje de alerta",
                        content: [
                            new sap.m.Label({
                                text: "Se concluyo la sesión o no tiene acceso a internet.",
                                wrapping: true,
                                width: "100%"
                            })
                        ],
                        state: "Warning",
                        type: "Message",
                        endButton: new sap.m.Button({
                            press: function () {
                                //this.getRouter().navTo("Vista_Login");
                                window.location.reload();
                                dialogMensajeSesion.close();
                            }.bind(this),
                            text: "Aceptar"
                        }),
                        afterClose: function () {
                            dialogMensajeSesion.destroy();
                        },
                        verticalScrolling: false
                    });
                    dialogMensajeSesion.open();
                }.bind(this)
            });
        },

        getDataResFacReg: function () {

            var oView = this.getView();
            var oModel = oView.getModel("myParam");
            oView.setModel(oModel);

            var url = "" + this.varTableURL + "/";
            var oModelJson = new sap.ui.model.odata.v2.ODataModel(url, true);

            var varUsuario = oModel.getProperty("/usuarioLogin");
            var varRUC = oModel.getProperty("/usuarioRuc");
            var allFilters = [];
            var sorters = [];
            var filter;
            var sorter;
            filter = new sap.ui.model.Filter("US_RUC", sap.ui.model.FilterOperator.EQ, varUsuario);
            allFilters.push(filter);
            filter = new sap.ui.model.Filter("EM_RUC", sap.ui.model.FilterOperator.EQ, varRUC);
            allFilters.push(filter);

            sorter = new sap.ui.model.Sorter("FC_FEC_REGISTRO", false);
            sorters.push(sorter);
            /*oModelJson.read("/" + this.varTableT_FAC + "?$format=json", {
                filters: allFilters,*/
            var oThis = this;
            var oModel9 = oThis.getView().getModel("myParam");
            this.oGlobalStop10 = "S";
            this.oGlobalIteracion0 = "0";
            oModel9.setProperty("/oListaVectorCabeceraDetalle", []);
            this.oEntrar = "N";
            while (this.oGlobalStop10 === "S") {
                $.ajax({
                    type: "GET",
                    async: false,
                    url: this.varTableURL + "/" + this.varTableT_FAC + "?$format=json&$skiptoken=" + this.oGlobalIteracion0 + "&$filter=US_RUC eq '" + varUsuario + "' and EM_RUC eq '" + varRUC + "'",
                    sorters: sorters,
                    success: function (response) {

                        var oDataHana = response.value;

                        console.log(oDataHana.length);
                        if (oDataHana.length !== 0) {

                            var oMatriz = oModel9.getProperty("/oListaVectorCabeceraDetalle");
                            var oVector = {};
                            if (oDataHana.length !== 0) {
                                for (var i = 0; i < oDataHana.length; i++) {
                                    oVector = {};
                                    oVector = oDataHana[i];
                                    oMatriz.push(oVector);
                                }
                                oModel9.setProperty("/oListaVectorCabeceraDetalle", oMatriz);
                            } else {
                                oModel9.setProperty("/oListaVectorCabeceraDetalle", []);
                            }
                            console.log(oModel9.getProperty("/oListaVectorCabeceraDetalle"));

                            var oParametro10 = parseInt(this.oGlobalIteracion0, 10);
                            oParametro10 = oParametro10 + 1000;
                            this.oGlobalIteracion0 = oParametro10.toString();
                            console.log(this.oGlobalIteracion0);
                            this.oGlobalStop10 = "S";
                        } else {
                            this.oGlobalStop10 = "N";
                            this.oEntrar = "S";
                        }

                        if (this.oEntrar === "S") {
                            var oVectorCabeceraDetalle = oModel9.getProperty("/oListaVectorCabeceraDetalle");
                            var oModelJSON = new sap.ui.model.json.JSONModel(oVectorCabeceraDetalle);
                            var tamTabla = oModelJSON.getData().length;
                            var vector = [];

                            var llave = {};
                            for (var i = 0; i < tamTabla; i++) {
                                llave = {};
                                llave.FC_FEC_REGISTRO = oModelJSON.getData()[i].FC_FEC_REGISTRO;
                                vector.push(llave);
                            }
                            oModel.setProperty("/listT_FAC_Details", vector);

                            //Reporte de factura
                            this.getView().byId("idItem7Registro").setValue(vector.length);

                            this.getView().byId("idItem7Registro").setValueColor("Good");
                            for (var j = 0; j < vector.length; j++) {
                                if (vector[j].FC_FEC_REGISTRO === "") {
                                    this.getView().byId("idItem7Registro").setValueColor("Error");
                                }
                            }
                            this.varGlobalContadorIniS++;
                            if ((this.varGlobalContadorIniS + this.varGlobalContadorIniE) === 3) {
                                this.getView().setBusy(false);
                                this.getItemVisibles();
                            }
                        }
                    }.bind(this),
                    error: function (oError) {
                        this.varGlobalContadorIniE++;
                        if ((this.varGlobalContadorIniS + this.varGlobalContadorIniE) === 3) {
                            this.getView().setBusy(false);
                            this.getItemVisibles();
                        }
                        this.oGlobalStop10 = "N";
                    }.bind(this)
                });
            }
        }
    });
});