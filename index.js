const SUPABASE_URL = "https://lafnqghrmyiuayazczkp.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_pkwtletsazrh5ILO6DXkAA_EcZj4pJF";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function cargarClientes() {
  const { data, error } = await supabase
    .from("clientes")
    .select("*")
    .order("id_cliente", { ascending: true });

  const lista = document.getElementById("listaClientes");
  lista.innerHTML = "";

  if (error) {
    console.error("Error al cargar clientes:", error);
    return;
  }

  data.forEach((cliente) => {
    const li = document.createElement("li");
    li.textContent = `${cliente.nombre} - ${cliente.telefono || "sin teléfono"} - ${cliente.correo || "sin correo"}`;
    lista.appendChild(li);
  });
}

document.getElementById("formCliente").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const correo = document.getElementById("correo").value;

  const { error } = await supabase.from("clientes").insert([
    {
      nombre: nombre,
      telefono: telefono,
      correo: correo,
      fecha_registro: new Date().toISOString().split("T")[0],
    },
  ]);

  if (error) {
    console.error("Error al insertar cliente:", error);
    alert("Hubo un error al agregar el cliente.");
    return;
  }

  e.target.reset();
  cargarClientes();
});

cargarClientes();
