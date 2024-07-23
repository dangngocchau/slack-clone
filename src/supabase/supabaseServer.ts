import { createServerClient, CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function supabaseServerClient() {
    const cookieStore = cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    cookieStore.set(name, value, options);  
                },
                remove(name: string, options: CookieOptions) {
                    cookieStore.set({ name, value: "" , ...options});
                }
            }
        }
    );

    // supabase.auth.getUser();

    return supabase;
}