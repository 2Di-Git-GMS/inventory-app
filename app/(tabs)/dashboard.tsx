import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";

type StatCard = {
  label: string;
  value: string;
  helper: string;
};

type StockItem = {
  name: string;
  sku: string;
  qty: number;
  min: number;
};

type ActivityItem = {
  title: string;
  detail: string;
  time: string;
};

type CategoryItem = {
  name: string;
  percent: number;
  value: string;
};

const stats: StatCard[] = [
  { label: "Total SKUs", value: "1,248", helper: "Active items" },
  { label: "Low Stock", value: "24", helper: "Needs reorder" },
  { label: "Out of Stock", value: "7", helper: "Critical" },
  { label: "Inventory Value", value: "$412k", helper: "Estimated" },
];

const lowStock: StockItem[] = [
  { name: "Arabica Beans 1kg", sku: "BN-AR-1KG", qty: 8, min: 20 },
  { name: "Milk 1L", sku: "DR-MK-1L", qty: 14, min: 40 },
  { name: "Paper Cup 12oz", sku: "PK-CUP-12", qty: 120, min: 300 },
  { name: "Vanilla Syrup", sku: "SY-VN-750", qty: 6, min: 18 },
];

const activity: ActivityItem[] = [
  { title: "PO #1042 received", detail: "+320 items", time: "Today • 09:15" },
  { title: "Stocktake finalized", detail: "Aisle B4", time: "Today • 08:10" },
  { title: "Transfer to Outlet 3", detail: "-68 items", time: "Yesterday • 18:32" },
];

const categories: CategoryItem[] = [
  { name: "Beverages", percent: 62, value: "$164k" },
  { name: "Packaging", percent: 18, value: "$48k" },
  { name: "Ingredients", percent: 14, value: "$37k" },
  { name: "Other", percent: 6, value: "$16k" },
];

export default function DashboardScreen() {
  const router = useRouter();
  const cardBg = useThemeColor({ light: "#F5F7FA", dark: "#1C1F23" }, "background");
  const cardBorder = useThemeColor({ light: "#E1E6ED", dark: "#2C3136" }, "background");
  const mutedText = useThemeColor({ light: "#5B6670", dark: "#A4ABB3" }, "text");
  const tint = useThemeColor({}, "tint");

  const dateLabel = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.header}>
          <View style={styles.headerText}>
            <ThemedText type="title">Inventory Dashboard</ThemedText>
            <ThemedText style={[styles.subhead, { color: mutedText }]}>
              Warehouse A · {dateLabel}
            </ThemedText>
          </View>
          <View style={[styles.badge, { borderColor: cardBorder }]}>
            <View style={[styles.badgeDot, { backgroundColor: tint }]} />
            <ThemedText style={styles.badgeText}>Stable</ThemedText>
          </View>
        </ThemedView>

        <View style={styles.grid}>
          {stats.map((item) => (
            <ThemedView
              key={item.label}
              style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}
            >
              <ThemedText style={[styles.cardLabel, { color: mutedText }]}>
                {item.label}
              </ThemedText>
              <ThemedText style={styles.cardValue}>{item.value}</ThemedText>
              <ThemedText style={[styles.cardHelper, { color: mutedText }]}>
                {item.helper}
              </ThemedText>
            </ThemedView>
          ))}
        </View>

        <ThemedView style={[styles.sectionCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <ThemedText type="subtitle">Inventory Health</ThemedText>
          <View style={styles.healthRow}>
            <ThemedText style={[styles.healthLabel, { color: mutedText }]}>On-hand</ThemedText>
            <ThemedText style={styles.healthValue}>92%</ThemedText>
          </View>
          <View style={[styles.track, { backgroundColor: cardBorder }]}>
            <View style={[styles.fill, { backgroundColor: tint, width: "92%" }]} />
          </View>
          <View style={styles.healthMeta}>
            <View style={styles.healthMetaItem}>
              <ThemedText style={[styles.healthMetaLabel, { color: mutedText }]}>
                Reorder Cycle
              </ThemedText>
              <ThemedText style={styles.healthMetaValue}>6 days</ThemedText>
            </View>
            <View style={styles.healthMetaItem}>
              <ThemedText style={[styles.healthMetaLabel, { color: mutedText }]}>
                Supplier SLA
              </ThemedText>
              <ThemedText style={styles.healthMetaValue}>2.3 days</ThemedText>
            </View>
          </View>
        </ThemedView>

        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">Low Stock</ThemedText>
          <ThemedText style={[styles.sectionAction, { color: tint }]}>Review</ThemedText>
        </View>
        <ThemedView style={[styles.sectionCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          {lowStock.map((item) => (
            <View key={item.sku} style={styles.listRow}>
              <View style={styles.listMain}>
                <ThemedText style={styles.listTitle}>{item.name}</ThemedText>
                <ThemedText style={[styles.listMeta, { color: mutedText }]}>
                  SKU {item.sku}
                </ThemedText>
              </View>
              <View style={[styles.qtyPill, { backgroundColor: cardBorder }]}>
                <ThemedText style={styles.qtyText}>
                  {item.qty} / {item.min}
                </ThemedText>
              </View>
            </View>
          ))}
        </ThemedView>

        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">Category Mix</ThemedText>
          <ThemedText style={[styles.sectionAction, { color: tint }]}>Details</ThemedText>
        </View>
        <ThemedView style={[styles.sectionCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          {categories.map((item) => (
            <View key={item.name} style={styles.categoryRow}>
              <View style={styles.categoryTop}>
                <ThemedText style={styles.categoryName}>{item.name}</ThemedText>
                <ThemedText style={styles.categoryValue}>{item.value}</ThemedText>
              </View>
              <View style={[styles.track, { backgroundColor: cardBorder }]}>
                <View style={[styles.fill, { backgroundColor: tint, width: `${item.percent}%` }]} />
              </View>
            </View>
          ))}
        </ThemedView>

        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">Recent Activity</ThemedText>
          <ThemedText style={[styles.sectionAction, { color: tint }]}>See all</ThemedText>
        </View>
        <ThemedView style={[styles.sectionCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          {activity.map((item) => (
            <View key={item.title} style={styles.activityRow}>
              <View style={styles.activityMain}>
                <ThemedText style={styles.activityTitle}>{item.title}</ThemedText>
                <ThemedText style={[styles.activityDetail, { color: mutedText }]}>
                  {item.detail}
                </ThemedText>
              </View>
              <ThemedText style={[styles.activityTime, { color: mutedText }]}>
                {item.time}
              </ThemedText>
            </View>
          ))}
        </ThemedView>

        <ThemedView style={styles.actions}>
          <Pressable
            style={[styles.actionButton, { borderColor: cardBorder }]}
            onPress={() => router.push("/add-item")}
          >
            <ThemedText style={styles.actionText}>Add Item</ThemedText>
          </Pressable>
          <Pressable style={[styles.actionButton, { borderColor: cardBorder }]} onPress={() => {}}>
            <ThemedText style={styles.actionText}>Receive Stock</ThemedText>
          </Pressable>
          <Pressable style={[styles.actionButton, { borderColor: cardBorder }]} onPress={() => {}}>
            <ThemedText style={styles.actionText}>Create PO</ThemedText>
          </Pressable>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
    gap: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  headerText: {
    flex: 1,
    gap: 6,
  },
  subhead: {
    fontSize: 13,
    letterSpacing: 0.2,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    width: "48%",
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 6,
  },
  cardLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "700",
  },
  cardHelper: {
    fontSize: 12,
  },
  sectionCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionAction: {
    fontSize: 13,
    fontWeight: "600",
  },
  healthRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  healthLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  healthValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  track: {
    height: 10,
    borderRadius: 999,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 999,
  },
  healthMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  healthMetaItem: {
    flex: 1,
    gap: 6,
  },
  healthMetaLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  healthMetaValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  listMain: {
    flex: 1,
    gap: 4,
  },
  listTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  listMeta: {
    fontSize: 12,
  },
  qtyPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  qtyText: {
    fontSize: 12,
    fontWeight: "600",
  },
  categoryRow: {
    gap: 8,
  },
  categoryTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
  },
  categoryValue: {
    fontSize: 13,
    fontWeight: "600",
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  activityMain: {
    flex: 1,
    gap: 4,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  activityDetail: {
    fontSize: 12,
  },
  activityTime: {
    fontSize: 12,
  },
  actions: {
    gap: 10,
  },
  actionButton: {
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
