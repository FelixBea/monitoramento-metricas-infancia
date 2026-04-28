import { ChildrenList } from "../_components/ChildrenList";
import { Child, ChildrenListProps } from "../_components/ChildrenList.types";

export default async function Children() {
  const childrenList = await getChildren();
  return (
    <section>
      <h1>Lista de crianças acompanhadas</h1>
      <ChildrenList childrenList={childrenList} />
    </section>
  );
}

export async function getChildren() {
  const baseUrl = process.env.API_BASE_URL;
  const authUrl = `${baseUrl}/children`;
  const res = await fetch(authUrl);
  const { data } = await res.json();

  return data;
}
