import { useState } from "react";

import { Button, StyleSheet, TextInput } from "react-native";

import { Text, View } from "@/components/Themed";

export default function TabTwoScreen() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState<any>(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function buscarCep() {
    setErro("");
    setEndereco(null);

    if (cep.length !== 8) {
      setErro("Digite um CEP com 8 números.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      const dados = await resposta.json();

      if (dados.erro) {
        setErro("CEP não encontrado.");
        return;
      }

      setEndereco(dados);
    } catch (erro) {
      setErro("Não foi possível consultar o CEP.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Buscar endereço</Text>

      <Text>Digite um CEP para consultar o endereço:</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 93510000"
        keyboardType="numeric"
        value={cep}
        onChangeText={setCep}
        maxLength={8}
      />

      <Button
        title={carregando ? "Buscando..." : "Buscar CEP"}
        onPress={buscarCep}
        disabled={carregando}
      />

      {erro !== "" && <Text style={styles.erro}>❌ {erro}</Text>}

      {endereco && (
        <View style={styles.resultado}>
          <Text style={styles.subtitulo}>📌 Endereço encontrado</Text>

          <Text>CEP: {endereco.cep}</Text>
          <Text>Rua: {endereco.logradouro}</Text>
          <Text>Bairro: {endereco.bairro}</Text>
          <Text>Cidade: {endereco.localidade}</Text>
          <Text>Estado: {endereco.uf}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
  },

  resultado: {
    padding: 20,
    gap: 8,
    borderRadius: 10,
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
  },

  erro: {
    fontSize: 16,
  },
});
