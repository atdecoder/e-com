import Image from "next/image";
import styles from "./page.module.css";
import ProductList from "@/components/ProductList";
import ProductLayout from "@/widgets/ProductLayout";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ProductLayout>
          <ProductList />
        </ProductLayout>
      </main>
    </div>
  );
}
