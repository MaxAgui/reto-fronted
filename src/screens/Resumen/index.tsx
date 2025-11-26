import { useAuth } from "@/src/context/AuthContext";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ResumenScreen() {
  const [loading, setLoading] = useState(true);
  const { user, selectedPlan } = useAuth();

  // Usar el plan seleccionado o uno por defecto
  const plan = selectedPlan;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
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
                {user?.name ?? ''} {user?.lastName ?? ''}
              </Text>
            </View>

            <View style={styles.divider} />

            {/* RESPONSABLE DE PAGO */}
            <Text style={styles.sectionTitle}>Responsable de pago</Text>
            <Text style={styles.sectionText}>
              {user?.documentType ?? ''}: {user?.documentNumber ?? ''}
            </Text>
            <Text style={styles.sectionText}>Celular: {user?.phoneNumber ?? ''}</Text>

            {/* PLAN ELEGIDO */}
            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Plan elegido</Text>
            <Text style={styles.sectionText}>{plan?.name ?? ''}</Text>
            <Text style={styles.sectionText}>Costo del Plan: S/{plan?.price.toFixed(2)} al mes</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 40,
    color: "#141938",
    textAlign: "center",
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
    color: "#141938",
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  userIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#141938",
  },
  divider: {
    height: 1,
    backgroundColor: "#D7DBF5",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#141938",
    marginTop: 8,
  },
  sectionText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#141938",
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
