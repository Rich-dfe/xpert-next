'use server';

export async function handleChildAction(dataFromChild) {
  // This code runs exclusively on the server
  console.log('Server Action received data:', dataFromChild);
  // Perform server-side operations:
  // - Interact with a database
  // - Call an external API (with server-side credentials)
  // - Write to a file
  // - Revalidate cache (e.g., revalidatePath('/'))
  return { status: 'success', message: `Processed ${dataFromChild} on server!` };
}