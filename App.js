import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";

export default function App() {
  const [campo, setCampo] = useState("");
  const [Logradouro, setLougradouro] = useState("");
  const [Bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [informacoes, SetInformacoes] = useState(false);

  async function buscaCep(cep) {
    const cepLimpo = cep.replace(/\D/g, ""); // RBGEX

    if (cepLimpo === "") {
      alert("Coloque o cep");
      return;
    }
    if (cepLimpo.length !== 8) {
      alert("Cep errado, digite 8 número");
      return;
    }

    try {
      const resposta = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );
      const json = await resposta.json();

      if (json.erro) {
        alert("CEP NÃO EXISTE");
        throw new Error("CEP não existe");
      }

      setBairro(json.Bairro);
      setLougradouro(json.Logradouro);
      setCep(json.cep);
      setCidade(json.localidade);
      SetInformacoes(true);
    } catch (error) {
      console.error("Erro ao consultar API: " + error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.caixa}>
        <View style={styles.cabecalho}>
          <Entypo name="location-pin" size={32} color={"black"} />
          <Text style={styles.titulo}>Buscar CEP</Text>
        </View>

        <View>
          <Text style={styles.subtitulo}>
            Digite o CEP para encontrar o endereço
          </Text>
          <Text style={styles.criador}>Feito por juao</Text>
        </View>

        <Text style={styles.label}>CEP</Text>

        <View style={styles.formulario}>
          <TextInput
            value={campo}
            onChangeText={(texto) => setCampo(texto)}
            style={styles.campo}
            placeholder="0000000"
          />
          <TouchableOpacity
            onPress={() => buscaCep(campo)}
            style={styles.botao}
          >
            <Entypo name="magnifying-glass" size={24} color={"#fff"} />
          </TouchableOpacity>
        </View>

        {informacoes && (
          <View style={styles.endereco}>
            <Text style={styles.tituloCep}>Endereço encontrado</Text>

            <View style={styles.informacoes}>
              <Text style={styles.tituloInfo}>cep</Text>
              <Text style={styles.enderecoInfo}>{cep}</Text>
              <View>
                <Text style={styles.tituloInfo}>Cep</Text>
                <Text style={styles.enderecoInfo}>{cep}</Text>
              </View>
              <View>
                <Text style={styles.tituloInfo}>Logradouro</Text>
                <Text style={styles.enderecoInfo}>{Logradouro}</Text>
              </View>
              <View>
                <Text style={styles.tituloInfo}>Bairro</Text>
                <Text style={styles.enderecoInfo}>{Bairro}</Text>
              </View>
              <View>
                <Text style={styles.tituloInfo}>cidade</Text>
                <Text style={styles.enderecoInfo}>{cidade}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  caixa: {
    borderWidth: 1,
    borderColor: "#dadada",
    borderRadius: 4,
    padding: 12,
  },
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginBottom: 8,
  },

  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#808080",
  },

  formulario: {
    flexDirection: "row",
    marginTop: 4,
  },

  campo: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d4d4d4",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    padding: 8,
  },

  botao: {
    backgroundColor: "#000",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "left",
  },
  endereco: {
    marginTop: 10,
    borderRadius: 8,
    borderwidth: 1,
    borderColor: "#d4d4d4",
    padding: 12,
  },

  tituloInfo: {
    color: "#b8aa95",
    fontSize: 18,
    fontWeight: "Bold",
    marginVertical: 6,
  },

  enderecoInfo: {
    color: "#7c7c7c",
    fontSize: 17,
    fontWeight: "bold",
  },

  criador: {
    color: "#6959CD",
    textAlign: "center",
    fontWeight: "bold",
  },
});
