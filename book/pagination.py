from rest_framework.pagination import PageNumberPagination


class BookPagination(PageNumberPagination):
    """
    Custom Pagination Class for Book API
    Supports 20 or 100 records per page
    """
    page_size_query_param = 'page_size'
    page_size_query_description = 'Number of records per page (20 or 100)'
    max_page_size = 100
    
    def get_page_size(self, request):
        """
        Allow client to set page_size via query parameter
        Valid values: 20 or 100
        Default: 20
        """
        page_size = request.query_params.get(self.page_size_query_param)
        
        if page_size:
            try:
                page_size = int(page_size)
                if page_size in [20, 100]:
                    return page_size
            except ValueError:
                pass
        
        # Default page_size
        return 20
