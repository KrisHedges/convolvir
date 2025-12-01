# Convolvir

Convolvir is a web application designed for browsing, visualizing, and previewing audio impulse responses (IRs). It provides a clean, modern interface for audio engineers and sound designers to explore IR libraries.

## Features

- **Impulse Response Browser**: Browse a paginated grid of impulse responses.
- **Visualizations**:
  - **Amplitude Envelope**: View the time-domain amplitude envelope of the IR.
  - **Frequency Spectrum**: Analyze the frequency content with a detailed bar chart.
- **Convolution Player**: Preview how an IR sounds by applying it to a test audio signal in real-time using a convolution reverb engine.
- **Search**: Filter IRs by name or metadata.
- **Authentication**: Secure access using Supabase Auth.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Database & Auth**: [Supabase](https://supabase.com)
- **Styling**: Vanilla CSS (No frameworks like Tailwind)
- **Language**: TypeScript

## Setup & Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/KrisHedges/convolvir.git
    cd convolvir
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Variables:**

    Create a `.env.local` file in the root directory and add your Supabase credentials:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

MIT
