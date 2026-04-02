import React from "react";
import { Pressable, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";

type InputFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "decimal-pad";
  helper?: string;
  multiline?: boolean;
};

function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  helper,
  multiline,
}: InputFieldProps) {
  const border = useThemeColor({ light: "#E1E6ED", dark: "#2C3136" }, "background");
  const inputBg = useThemeColor({ light: "#FFFFFF", dark: "#15181C" }, "background");
  const muted = useThemeColor({ light: "#5B6670", dark: "#A4ABB3" }, "text");
  const text = useThemeColor({}, "text");

  return (
    <View style={styles.field}>
      <ThemedText style={styles.fieldLabel}>{label}</ThemedText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={muted}
        keyboardType={keyboardType}
        multiline={multiline}
        style={[
          styles.input,
          {
            backgroundColor: inputBg,
            borderColor: border,
            color: text,
            minHeight: multiline ? 96 : undefined,
            textAlignVertical: multiline ? "top" : "center",
          },
        ]}
      />
      {helper ? <ThemedText style={[styles.helper, { color: muted }]}>{helper}</ThemedText> : null}
    </View>
  );
}

export default function AddItemScreen() {
  const router = useRouter();
  const cardBg = useThemeColor({ light: "#F5F7FA", dark: "#1C1F23" }, "background");
  const cardBorder = useThemeColor({ light: "#E1E6ED", dark: "#2C3136" }, "background");
  const muted = useThemeColor({ light: "#5B6670", dark: "#A4ABB3" }, "text");
  const tint = useThemeColor({}, "tint");
  const text = useThemeColor({}, "text");

  const [status, setStatus] = React.useState<"active" | "inactive">("active");
  const [form, setForm] = React.useState({
    name: "",
    sku: "",
    category: "",
    unit: "pcs",
    location: "",
    supplier: "",
    cost: "",
    price: "",
    onHand: "",
    minStock: "",
    notes: "",
  });

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <ThemedText style={[styles.backText, { color: tint }]}>Back</ThemedText>
          </Pressable>
          <ThemedText type="title">Add Item</ThemedText>
          <ThemedText style={[styles.subhead, { color: muted }]}>
            Create a new SKU for your inventory.
          </ThemedText>
        </ThemedView>

        <ThemedView style={[styles.section, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <ThemedText type="subtitle">Item Details</ThemedText>
          <InputField
            label="Item Name"
            value={form.name}
            onChangeText={(value) => updateField("name", value)}
            placeholder="e.g. Arabica Beans 1kg"
          />
          <View style={styles.row}>
            <View style={styles.flex}>
              <InputField
                label="SKU"
                value={form.sku}
                onChangeText={(value) => updateField("sku", value)}
                placeholder="BN-AR-1KG"
              />
            </View>
            <View style={styles.flex}>
              <InputField
                label="Category"
                value={form.category}
                onChangeText={(value) => updateField("category", value)}
                placeholder="Beverages"
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.flex}>
              <InputField
                label="Unit"
                value={form.unit}
                onChangeText={(value) => updateField("unit", value)}
                placeholder="pcs, box, kg"
              />
            </View>
            <View style={styles.flex}>
              <InputField
                label="Location"
                value={form.location}
                onChangeText={(value) => updateField("location", value)}
                placeholder="Aisle B4"
              />
            </View>
          </View>
          <InputField
            label="Supplier"
            value={form.supplier}
            onChangeText={(value) => updateField("supplier", value)}
            placeholder="PT Coffee Supply"
          />
        </ThemedView>

        <ThemedView style={[styles.section, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <ThemedText type="subtitle">Stock & Pricing</ThemedText>
          <View style={styles.row}>
            <View style={styles.flex}>
              <InputField
                label="On-hand Stock"
                value={form.onHand}
                onChangeText={(value) => updateField("onHand", value)}
                placeholder="0"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.flex}>
              <InputField
                label="Minimum Stock"
                value={form.minStock}
                onChangeText={(value) => updateField("minStock", value)}
                placeholder="10"
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.flex}>
              <InputField
                label="Cost Price"
                value={form.cost}
                onChangeText={(value) => updateField("cost", value)}
                placeholder="0.00"
                keyboardType="decimal-pad"
              />
            </View>
            <View style={styles.flex}>
              <InputField
                label="Sell Price"
                value={form.price}
                onChangeText={(value) => updateField("price", value)}
                placeholder="0.00"
                keyboardType="decimal-pad"
              />
            </View>
          </View>
          <View style={styles.statusRow}>
            <ThemedText style={styles.fieldLabel}>Status</ThemedText>
            <View style={styles.statusChips}>
              <Pressable
                style={[
                  styles.statusChip,
                  {
                    borderColor: cardBorder,
                    backgroundColor: status === "active" ? tint : "transparent",
                  },
                ]}
                onPress={() => setStatus("active")}
              >
                <ThemedText style={{ color: status === "active" ? "#fff" : text }}>
                  Active
                </ThemedText>
              </Pressable>
              <Pressable
                style={[
                  styles.statusChip,
                  {
                    borderColor: cardBorder,
                    backgroundColor: status === "inactive" ? tint : "transparent",
                  },
                ]}
                onPress={() => setStatus("inactive")}
              >
                <ThemedText style={{ color: status === "inactive" ? "#fff" : text }}>
                  Inactive
                </ThemedText>
              </Pressable>
            </View>
          </View>
        </ThemedView>

        <ThemedView style={[styles.section, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <ThemedText type="subtitle">Notes</ThemedText>
          <InputField
            label="Internal Notes"
            value={form.notes}
            onChangeText={(value) => updateField("notes", value)}
            placeholder="Add storage tips, batch info, etc."
            helper="Visible to internal staff only."
            multiline
          />
        </ThemedView>

        <ThemedView style={styles.actions}>
          <Pressable style={[styles.primaryButton, { backgroundColor: tint }]}>
            <ThemedText style={styles.primaryText}>Save Item</ThemedText>
          </Pressable>
          <Pressable style={[styles.secondaryButton, { borderColor: cardBorder }]} onPress={() => {}}>
            <ThemedText style={styles.secondaryText}>Save & Add Another</ThemedText>
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
    gap: 8,
  },
  backText: {
    fontSize: 13,
    fontWeight: "600",
  },
  subhead: {
    fontSize: 13,
  },
  section: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 14,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  flex: {
    flex: 1,
  },
  field: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  helper: {
    fontSize: 12,
  },
  statusRow: {
    gap: 10,
  },
  statusChips: {
    flexDirection: "row",
    gap: 10,
  },
  statusChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryButton: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
