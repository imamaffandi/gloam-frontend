import React from 'react'
import blogimage from '../assets/usir.jpg'
import { Link } from 'react-router-dom'
const Blog = () => {
    return (
        <main className='min-h-screen w-full font-body'>
            <img src={blogimage} alt="" className='w-full h-[80vh] object-cover' />
            <Link to={"/"} className='absolute left-5 top-5 z-50 flex items-center justify-center gap-2 bg-light rounded-xl px-5 py-3'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                </svg>
                Back
            </Link>
            <div className='space-y-2 p-5'>
                <h1 className='text-5xl tracking-widest font-semibold'>RIVIEW BERITA : USIR PARA JAGOAN! – DI ANTARA DENTUM MUSIK DAN BAYANG KEKERASAN KEPADA BAND HUSTTLE
                </h1>
                <p className='text-sm tracking-wide'>
                    Ada malam ketika musik seharusnya menjadi rumah: <br />
                    tempat suara menemukan tubuhnya,<br />
                    dan tubuh menemukan kebebasannya.<br />
                    Namun di Kota Batu, di sebuah gigs underground,<br />
                    panggung berubah menjadi batu nisan sementara—<br />
                    tempat harmoni retak oleh amarah yang tak bernama.<br />
                    Review ini mencoba menatap peristiwa itu bukan hanya sebagai berita,<br />
                    melainkan sebagai GETARAN KEMANUSIAAN,<br />
                    yang terselip di antara dentum drum dan jeritan gitar. Hummmm…. Apakah, nyawa tidak terlalu berharga bagimu? (PEMBAC*K)<br />
                    Pada 16 November 2025,<br />
                    di Plum Hotel Palereman,<br />
                    band Husttle menaikkan semangat tiga lagu,<br />
                    hingga tiba-tiba badai manusia datang tanpa aba-aba.<br />
                    Irmanda Putra, sang vokalis,<br />
                    diserang oleh sekelompok pemuda dari kerumunan.<br />
                    Regi—bassis yang melihat temannya direnggut kekacauan—<br />
                    mencoba melerai dengan kalimat sederhana<br />
                    yang biasanya cukup untuk menghentikan konflik kecil dalam skena:<br />
                    “Mas, jangan… itu temanku.”<br />
                    Namun malam itu tak mendengar.<br />
                    Keduanya dikeroyok.<br />
                    Irmanda dibacok dari belakang saat diajak “damai”.<br />
                    Regi jatuh, diinjak, pingsan, lalu sadar di depan rumah warga.<br />
                    Kekerasan itu tajam, bukan hanya senjatanya,<br />
                    tetapi juga pengkhianatan ruang yang seharusnya aman.<br />
                    Skena underground telah lama menjadi rumah mereka<br />
                    yang ditolak, tak didengar, atau terlalu jujur bagi dunia.<br />
                    Di sana, moshing dan pit bukan kekerasan—<br />
                    itu ritual, bahasa tubuh solidaritas.<br />
                    Namun malam itu,<br />
                    budaya itu dirampas dan diganti dengan agresi yang tidak punya ritme.<br />
                    Kekerasan masuk ke ruang seni seperti coretan vandal<br />
                    pada mural yang sedang dikerjakan.<br />
                    Fenomena ini mengungkap satu hal:<br />
                    anak-anak muda yang belum selesai belajar hidup<br />
                    masuk ke ruang yang seharusnya tempat mereka belajar menghargai hidup.<br />
                    Delapan pelaku diamankan, beberapa di antaranya masih pelajar—<br />
                    dan itu menyentuh sisi gelap dari realitas bahwa<br />
                    kemarahan sering lahir lebih cepat daripada kebijaksanaan.<br />
                    Tragedi ini bukan hanya kriminalitas,<br />
                    tapi juga alarm bagi ekosistem budaya alternatif:<br />
                    betapa rapuhnya ruang aman bagi kreativitas,<br />
                    dan betapa mudahnya ia dicabik oleh ego dan dendam.<br />
                    Ada luka yang tidak terlihat oleh kamera berita:<br />
                    luka pada komunitas,<br />
                    luka pada kepercayaan antara penonton dan panggung,<br />
                    luka pada pemahaman bahwa musik bisa melindungi.<br />
                    Irmanda menanggung bekas bacokan,<br />
                    Regi membawa memar,<br />
                    tetapi yang paling menyakitkan adalah<br />
                    bahwa malam itu membuktikan<br />
                    bahwa seni pun bisa diserang dari punggungnya sendiri.<br />
                    Namun para seniman selalu bangkit:<br />
                    dari amplop amplop kecil honor yang tidak seberapa,<br />
                    dari ruang latihan panas,<br />
                    dari panggung improvisasi,<br />
                    dan kini—dari tragedi.<br />
                    Semoga malam-malam gigs berikutnya<br />
                    kembali menjadi altar suara, bukan arena luka.<br />
                    Semoga setiap anak muda yang datang<br />
                    meninggalkan amarah di depan pintu,<br />
                    dan membawa pulang hanya keringat serta cerita.<br />
                    Dan semoga luka Irmanda & Regi<br />
                    menjadi catatan keras<br />
                    bahwa musik bukan tempat kematian,<br />
                    melainkan tempat kita belajar menjadi manusia.
                </p>
            </div>
        </main>
    )
}

export default Blog