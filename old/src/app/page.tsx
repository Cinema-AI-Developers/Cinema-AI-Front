import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface HomeProps {
  children: JSX.Element;
}

export default function Home() {
  return (
    <>
      <Header />
      <main></main>
      <Footer />
    </>
  );
}
