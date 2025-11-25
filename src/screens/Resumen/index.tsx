import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ResumenScreen() {
  const [loading, setLoading] = useState(false);

  // 🔥 Data fake
  const user = {
    name: "Rocio",
    lastName: "Miranda Díaz",
    documentType: "DNI",
    documentNumber: "444888888",
    phoneNumber: "5130216147",
  };

  const plan = {
    name: "Plan en Casa y Clínica",
    price: 99,
  };

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      {/* TÍTULO */}
      <Text style={styles.title}>Resumen del seguro</Text>

      {/* CARD */}
      <View style={styles.card}>
        {loading ? (
          <View>
            {/* SHIMMER / SKELETON */}
            <View style={[styles.shimmer, { width: 160, height: 12 }]} />
            <View style={[styles.shimmer, { width: 220, height: 28, marginTop: 8 }]} />

            <View style={styles.divider} />

            <View style={[styles.shimmer, { width: 160, height: 20, marginTop: 8 }]} />
            <View style={[styles.shimmer, { width: 100, height: 12, marginTop: 4 }]} />
            <View style={[styles.shimmer, { width: 120, height: 12, marginTop: 4 }]} />

            <View style={[styles.shimmer, { width: 100, height: 20, marginTop: 16 }]} />
            <View style={[styles.shimmer, { width: 80, height: 12, marginTop: 4 }]} />
            <View style={[styles.shimmer, { width: 160, height: 12, marginTop: 4 }]} />
          </View>
        ) : (
          <>
            {/* CABECERA */}
            <Text style={styles.sectionSmallTitle}>PRECIOS CALCULADOS PARA:</Text>

            <View style={styles.userRow}>
              <Image
                source={require("@/assets/icons/users_icon.png")}
                style={styles.userIcon}
              />
              <Text style={styles.userName}>
                {user.name} {user.lastName}
              </Text>
            </View>

            <View style={styles.divider} />

            {/* RESPONSABLE DE PAGO */}
            <Text style={styles.sectionTitle}>Responsable de pago</Text>
            <Text style={styles.sectionText}>
              {user.documentType}: {user.documentNumber}
            </Text>
            <Text style={styles.sectionText}>Celular: {user.phoneNumber}</Text>

            {/* PLAN ELEGIDO */}
            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Plan elegido</Text>
            <Text style={styles.sectionText}>{plan.name}</Text>
            <Text style={styles.sectionText}>Costo del Plan: S/{plan.price} al mes</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7FF",
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 20,
    color: "#111",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 28,
    shadowColor: "#aeaef3",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  sectionSmallTitle: {
    textTransform: "uppercase",
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: "900",
    color: "#555",
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  userIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: "900",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#333",
    marginTop: 8,
  },
  sectionText: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
  shimmer: {
    backgroundColor: "#E8E8F0",
    borderRadius: 6,
  },
  backButton: {
    marginTop: 28,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#EB004A",
    alignItems: "center",
  },
  backButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "900",
  },
});
