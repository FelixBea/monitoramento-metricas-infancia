import { ChildrenList } from "../_components/ChildrenList";

export default async function Children() {
    console.error("--------------------");
  const childrenList = await getChildren();
  console.error("childrenList: ", childrenList);

  return (
    <section>
      <h1>Lista de crianças acompanhadas</h1>
      {childrenList && <ChildrenList childrenList={childrenList} />}
      
    </section>
  );
}

export async function getChildren() {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    return [];
  }
  const authUrl = `${baseUrl}/children`;
  const res = await fetch(authUrl);
  const { data } = await res.json();

  return data;
}
