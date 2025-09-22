import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import logo from "../assets/img/logo.jpg";

export const Facture = ({ dataprice, data }) => {
  const venta = dataprice?.valorventa;
  const nombrecliente = dataprice?.nombre_cliente;
  const fechaventa = dataprice?.fecha_venta;
  const celular = dataprice?.celular;
  const correo = dataprice?.correo;

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: "Helvetica",
      fontSize: 12,
      backgroundColor: "#fff",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      borderBottom: "2px solid #003333",
      paddingBottom: 10,
    },
    logo: {
      width: 80,
      height: 80,
      objectFit: "cover",
    },
    companyInfo: {
      textAlign: "right",
      fontSize: 11,
    },
    section: {
      marginBottom: 20,
      padding: 10,
      border: "1px solid #ddd",
      borderRadius: 5,
      backgroundColor: "#f9f9f9",
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: "bold",
      marginBottom: 6,
      color: "#003333",
    },
    table: {
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderColor: "#003333",
      marginBottom: 20,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableColHeader: {
      width: "33.33%",
      borderStyle: "solid",
      borderWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      backgroundColor: "#003333",
      color: "#fff",
      textAlign: "center",
      padding: 6,
      fontWeight: "bold",
      fontSize: 12,
    },
    tableCol: {
      width: "33.33%",
      borderStyle: "solid",
      borderWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      textAlign: "center",
      padding: 6,
      fontSize: 11,
    },
    totalBox: {
      marginTop: 10,
      padding: 10,
      textAlign: "right",
      backgroundColor: "#eaeaea",
      fontWeight: "bold",
      fontSize: 13,
      borderRadius: 5,
    },
    footer: {
      position: "absolute",
      bottom: 30,
      left: 40,
      right: 40,
      textAlign: "center",
      fontSize: 10,
      color: "grey",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <View style={styles.companyInfo}>
            <Text>Empresa: JEVACOFFE SAS</Text>
            <Text>NIT: 9018119643</Text>
            <Text>Dirección: Calle 22 A sur #45-67, Pitalito Huila</Text>
            <Text>Teléfono: +57 3001210554</Text>
            <Text>Email: jevacoffeeofficial@gmail.com</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos del Cliente</Text>
          <Text>Nombre: {nombrecliente}</Text>
          <Text>Correo: {correo}</Text>
          <Text>Fecha Venta: {fechaventa}</Text>
          <Text>Celular: {celular}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Descripción</Text>
            <Text style={styles.tableColHeader}>Cantidad</Text>
            <Text style={styles.tableColHeader}>Precio</Text>
          </View>

          {data?.productos?.map((producto, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCol}>{producto.nombre}</Text>
              <Text style={styles.tableCol}>{producto.unidades_compradas}</Text>
              <Text style={styles.tableCol}>${producto.valor_unitario}</Text>
            </View>
          ))}
        </View>


        <View style={styles.totalBox}>
          <Text>Total a Pagar: ${venta}</Text>
        </View>


        <Text style={styles.footer}>
          Gracias por su compra. Esta factura es un comprobante generado electrónicamente.
        </Text>
      </Page>
    </Document>
  );
};
