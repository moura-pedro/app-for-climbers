import { createClient } from 'npm:@supabase/supabase-js@2.39.3';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? ''
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

interface PageData {
  title: string;
  slug: string;
  meta_description?: string;
  status: 'draft' | 'published' | 'archived';
}

interface ContentBlockData {
  page_id: string;
  identifier: string;
  content_type: string;
  content: Record<string, unknown>;
  order: number;
  status: 'draft' | 'published' | 'archived';
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.split('/').filter(Boolean);
    const resource = path[1]; // 'pages', 'blocks', 'media', 'navigation', 'settings'
    const id = path[2];

    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.split(' ')[1]);
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Handle different resources
    switch (resource) {
      case 'pages':
        return await handlePages(req, id);
      case 'blocks':
        return await handleContentBlocks(req, id);
      case 'navigation':
        return await handleNavigation(req, id);
      case 'settings':
        return await handleSettings(req, id);
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid resource' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function handlePages(req: Request, id?: string) {
  switch (req.method) {
    case 'GET':
      if (id) {
        const { data, error } = await supabase
          .from('pages')
          .select(`
            *,
            content_blocks (*)
          `)
          .eq('id', id)
          .single();

        if (error) throw error;
        return Response.json(data, { headers: corsHeaders });
      } else {
        const { data, error } = await supabase
          .from('pages')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return Response.json(data, { headers: corsHeaders });
      }

    case 'POST':
      const pageData: PageData = await req.json();
      const { data, error } = await supabase
        .from('pages')
        .insert(pageData)
        .select()
        .single();

      if (error) throw error;
      return Response.json(data, { headers: corsHeaders });

    case 'PUT':
      if (!id) throw new Error('ID is required for updates');
      const updateData: Partial<PageData> = await req.json();
      const { data: updated, error: updateError } = await supabase
        .from('pages')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;
      return Response.json(updated, { headers: corsHeaders });

    case 'DELETE':
      if (!id) throw new Error('ID is required for deletion');
      const { error: deleteError } = await supabase
        .from('pages')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      return Response.json({ success: true }, { headers: corsHeaders });

    default:
      throw new Error('Method not allowed');
  }
}

async function handleContentBlocks(req: Request, id?: string) {
  switch (req.method) {
    case 'GET':
      if (id) {
        const { data, error } = await supabase
          .from('content_blocks')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        return Response.json(data, { headers: corsHeaders });
      } else {
        const pageId = new URL(req.url).searchParams.get('page_id');
        if (!pageId) throw new Error('page_id is required');

        const { data, error } = await supabase
          .from('content_blocks')
          .select('*')
          .eq('page_id', pageId)
          .order('order', { ascending: true });

        if (error) throw error;
        return Response.json(data, { headers: corsHeaders });
      }

    case 'POST':
      const blockData: ContentBlockData = await req.json();
      const { data, error } = await supabase
        .from('content_blocks')
        .insert(blockData)
        .select()
        .single();

      if (error) throw error;
      return Response.json(data, { headers: corsHeaders });

    case 'PUT':
      if (!id) throw new Error('ID is required for updates');
      const updateData: Partial<ContentBlockData> = await req.json();
      const { data: updated, error: updateError } = await supabase
        .from('content_blocks')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;
      return Response.json(updated, { headers: corsHeaders });

    case 'DELETE':
      if (!id) throw new Error('ID is required for deletion');
      const { error: deleteError } = await supabase
        .from('content_blocks')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      return Response.json({ success: true }, { headers: corsHeaders });

    default:
      throw new Error('Method not allowed');
  }
}

async function handleNavigation(req: Request, id?: string) {
  switch (req.method) {
    case 'GET':
      if (id) {
        const { data, error } = await supabase
          .from('navigation_menu')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        return Response.json(data, { headers: corsHeaders });
      } else {
        const { data, error } = await supabase
          .from('navigation_menu')
          .select('*')
          .order('order', { ascending: true });

        if (error) throw error;
        return Response.json(data, { headers: corsHeaders });
      }

    case 'POST':
      const navData = await req.json();
      const { data, error } = await supabase
        .from('navigation_menu')
        .insert(navData)
        .select()
        .single();

      if (error) throw error;
      return Response.json(data, { headers: corsHeaders });

    case 'PUT':
      if (!id) throw new Error('ID is required for updates');
      const updateData = await req.json();
      const { data: updated, error: updateError } = await supabase
        .from('navigation_menu')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;
      return Response.json(updated, { headers: corsHeaders });

    case 'DELETE':
      if (!id) throw new Error('ID is required for deletion');
      const { error: deleteError } = await supabase
        .from('navigation_menu')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      return Response.json({ success: true }, { headers: corsHeaders });

    default:
      throw new Error('Method not allowed');
  }
}

async function handleSettings(req: Request, id?: string) {
  switch (req.method) {
    case 'GET':
      if (id) {
        const { data, error } = await supabase
          .from('settings')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        return Response.json(data, { headers: corsHeaders });
      } else {
        const group = new URL(req.url).searchParams.get('group');
        let query = supabase.from('settings').select('*');
        
        if (group) {
          query = query.eq('group', group);
        }

        const { data, error } = await query;
        if (error) throw error;
        return Response.json(data, { headers: corsHeaders });
      }

    case 'POST':
      const settingData = await req.json();
      const { data, error } = await supabase
        .from('settings')
        .insert(settingData)
        .select()
        .single();

      if (error) throw error;
      return Response.json(data, { headers: corsHeaders });

    case 'PUT':
      if (!id) throw new Error('ID is required for updates');
      const updateData = await req.json();
      const { data: updated, error: updateError } = await supabase
        .from('settings')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;
      return Response.json(updated, { headers: corsHeaders });

    case 'DELETE':
      if (!id) throw new Error('ID is required for deletion');
      const { error: deleteError } = await supabase
        .from('settings')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      return Response.json({ success: true }, { headers: corsHeaders });

    default:
      throw new Error('Method not allowed');
  }
}